import ReadItem from "@/components/read-item";
import { EDIT_RESUME_NAME_SPACE, IBarChartItem, IEditResumeModel } from "@/models/edit-resume"
import { Button, Checkbox, Col, Form, Input, message, Row, Select, Space } from "antd"
import { masteryOptions } from "./config";
import { DeleteOutlined, DeleteTwoTone, PlusOutlined } from "@ant-design/icons";
import { connect } from "dva";
import { ContentConfigKeyEnum } from "../../config";
import QuillEditor from "@/components/quill-editor";
import { useState } from "react";

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
  const [form] = Form.useForm();
  return <Form form={form} layout="inline" onValuesChange={onValuesChange} initialValues={values} className="skills-bar-set-form">
    <Form.Item name="name">
      <ReadItem className="skill-name"/>
    </Form.Item>
    <Form.Item name="mastery" >
      <Select style={{width: "100px"}} options={masteryOptions} labelInValue/>
    </Form.Item>
    <Form.Item name="showBar" valuePropName="checked" >
      <Checkbox >展示百分比</Checkbox>
    </Form.Item>
    <Form.Item >
    <DeleteOutlined onClick={onDelete}/>
    </Form.Item>
  </Form>
}

function SkillsSetForm(props: ISkillsSetFormProps) {
  const { infoModuleList, dispatch, skills } = props;
  const [name, setName] = useState<string>('')
  const colSpan1 = 8, colSpan2 = 12;
  const { data, content } = skills ?? {}
  const title = infoModuleList?.find(item => item.key === ContentConfigKeyEnum.SKILLS)?.title ?? ''
  const onChangeContent = (value: string) => {
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.SKILLS,
        value: {
          ...skills,
          content: value
        }
      }
    })
  }
  const onAdd = () => {
    if(!name) {
      message.warning(`请输入${title}`)
      return;
    }
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.SKILLS,
        value: {
          ...skills,
          data: [...data, {
            name,
            mastery: 0.95,
            showBar: true
          }]
        }
      }
    })
    setName('')
  }
  const onDelete = (index: number) => {
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.SKILLS,
        value: {
          ...skills,
          data: data.filter((item, idx) => index !== idx)
        }
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
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.SKILLS,
        value: {
          ...skills,
          data: newList
        }
      }
    })
  }
  return (
    <div className="skills-set-form-wrapper">
      <Row>
        <Space>
          <Input value={name} placeholder={`请输入${title}`} onChange={(e) => setName(e.target.value)}/>
          <Button type="primary" ghost onClick={onAdd}><PlusOutlined />添加{title}</Button>
        </Space>
      </Row>
      <Row>
        {
          data.map((item, index) => (
            <Col span={colSpan2}>
              <SkillsBarSetForm key={item.name} index={index} values={item} onValuesChange={(v) => onListValueChange(v, index)} onDelete={() => onDelete(index)} />
            </Col>
          ))
        }
      </Row>
      <Row>
        <Col span={24}>
          <div className="skills-desc-title">{title}描述：</div>
          <QuillEditor value={content} onChange={onChangeContent}/>
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