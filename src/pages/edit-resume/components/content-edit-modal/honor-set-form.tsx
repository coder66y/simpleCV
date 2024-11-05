import ReadItem from "@/components/read-item";
import { EDIT_RESUME_NAME_SPACE, IBarChartItem, IEditResumeModel } from "@/models/edit-resume"
import { Button, Col, Input, message, Row, Space, Tag } from "antd"
import { PlusOutlined } from "@ant-design/icons";
import { connect } from "dva";
import { ContentConfigKeyEnum } from "../../config";
import QuillEditor from "@/components/quill-editor";
import { useState } from "react";

export interface IHonorsSetFormProps {
  dispatch: React.Dispatch<any>;
  honors: IEditResumeModel['honors'];
  infoModuleList: IEditResumeModel['moduleList'],
}

function SkillsSetForm(props: IHonorsSetFormProps) {
  const { infoModuleList, dispatch, honors } = props;
  const [name, setName] = useState<string>('')
  const { data, content } = honors ?? {}
  const title = infoModuleList?.find(item => item.key === ContentConfigKeyEnum.HONOR)?.title ?? ''
  const onChangeContent = (value: string) => {
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.HONOR,
        value: {
          ...honors,
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
        key: ContentConfigKeyEnum.HONOR,
        value: {
          ...honors,
          data: [...data, name]
        }
      }
    })
    setName('')
  }
  const onDelete = (index: number) => {
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.HONOR,
        value: {
          ...honors,
          data: data.filter((it, idx) => idx !== index)
        }
      }
    })
  }

  return (
    <div className="honors-set-form-wrapper">
      <Row>
        <Space>
          <Input value={name} placeholder={`请输入${title}`} onChange={(e) => setName(e.target.value)}/>
          <Button type="primary" ghost onClick={onAdd}><PlusOutlined />添加{title}</Button>
        </Space>
      </Row>
      <Row>
        {
          data?.map((item, index) => {
            return <Tag color="green" closeIcon onClose={() => onDelete(index)}>{item}</Tag>
          })
        }
      </Row>
      <Row>
        <Col span={24}>
          <div className="desc-title">{title}描述：</div>
          <QuillEditor value={content} onChange={onChangeContent}/>
        </Col>
      </Row>
    </div>
  )
}

export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    honors: editResume.honors,
    infoModuleList: editResume.moduleList
  }
})(SkillsSetForm)