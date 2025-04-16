import ReadItem from "@/components/read-item";
import { EDIT_RESUME_NAME_SPACE, IBarChartItem, IEditResumeModel } from "@/models/edit-resume"
import { Button, Checkbox, Col, Form, Input, message, Row, Select, Space } from "antd"
import { connect } from "dva";
import { ContentConfigKeyEnum, FORM_OPTIONS } from "../../config";
import QuillEditor from "@/components/quill-editor";
import { useState } from "react";
import { useDebounceFn } from "ahooks";

export interface ISkillsBarSetFormProps {
  index: number;
  values: IBarChartItem;
  onValuesChange: (values: IBarChartItem) => void;
  onDelete: () => void;
}
export interface ISkillsSetFormProps {
  dispatch: React.Dispatch<any>;
  skills: IEditResumeModel['skills'];
  infoModuleList: IEditResumeModel['moduleList'],
  
}
const SkillsBarSetForm = (props: ISkillsBarSetFormProps) => {
  const { values, onDelete, onValuesChange } = props;
  const [form] = Form.useForm<IBarChartItem>();
  return <Form form={form} layout="inline" onValuesChange={onValuesChange} initialValues={values} className="skills-bar-set-form">
    <Form.Item name="name">
      <ReadItem className="skill-name"/>
    </Form.Item>
    <Form.Item name="mastery" >
      <Select style={{width: "100px"}} options={FORM_OPTIONS.mastery} labelInValue/>
    </Form.Item>
    <Form.Item name="showBar" valuePropName="checked" >
      <Checkbox >展示百分比</Checkbox>
    </Form.Item>
    <Form.Item >
    <i className='iconfont' onClick={onDelete}>&#xe600;</i>
    </Form.Item>
  </Form>
}

function SkillsSetForm(props: ISkillsSetFormProps) {
  const { infoModuleList, dispatch, skills } = props;
  const [name, setName] = useState<string>('')
  const colSpan1 = 8, colSpan2 = 12;
  const { data = [], content } = skills ?? {}
  const title = infoModuleList?.find(item => item.key === ContentConfigKeyEnum.SKILLS)?.title ?? '';
  const _dispatch = (action: string, payload: Record<string, any>) => {
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/${action}`,
      payload,
    })
  }

  const onChangeContent = (value: string) => {
    _dispatch('changeFormValues', {
      key: ContentConfigKeyEnum.SKILLS,
      value: {
        ...skills,
        content: value
      }
    })
  }

  const onAdd = () => {
    if(!name) {
      message.warning(`请输入${title}`)
      return;
    }
    _dispatch('changeFormValues', {
      key: ContentConfigKeyEnum.SKILLS,
      value: {
        ...skills,
        data: [...data, {
          name,
          mastery: {
            value: 0.95
          },
          showBar: true
        }]
      }
    })
    setName('')
  }
  const onDelete = (index: number) => {
    _dispatch('changeFormValues', {
      key: ContentConfigKeyEnum.SKILLS,
      value: {
        ...skills,
        data: data.filter((item, idx) => index !== idx)
      }
    })
  }

  const onListValueChange = (value: IBarChartItem, index: number) => {
    const newList = data.map((item, idx) => {
      if(index === idx) {
        return {
            ...item,
            ...value,
          }
        }
      return item
    })
    _dispatch('changeFormValues', {
      key: ContentConfigKeyEnum.SKILLS,
      value: {
        ...skills,
        data: newList
      }
    })
  }

  const { run: _onChangeContent } = useDebounceFn((value) => {
    onChangeContent?.(value)
  }, { wait: 500 })

  return (
    <div className="skills-set-form-wrapper">
      <Row>
        <Space>
          <Input value={name} placeholder={`请输入${title}`} onChange={(e) => setName(e.target.value)}/>
          <Button type="primary" ghost onClick={onAdd}><i className='iconfont'>&#xe60c;</i>添加{title}</Button>
        </Space>
      </Row>
      <Row>
        {
          data.map((item, index) => (
            <Col span={colSpan2} key={item.name + index}>
              <SkillsBarSetForm index={index} values={item} onValuesChange={(v) => onListValueChange(v, index)} onDelete={() => onDelete(index)} />
            </Col>
          ))
        }
      </Row>
      <Row>
        <Col span={24}>
          <div className="skills-desc-title">{title}描述：</div>
          <QuillEditor value={content} onChange={_onChangeContent}/>
        </Col>
      </Row>
    </div>
  )
}

export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    skills: editResume.skills,
    infoModuleList: editResume.moduleList
  }
})(SkillsSetForm)