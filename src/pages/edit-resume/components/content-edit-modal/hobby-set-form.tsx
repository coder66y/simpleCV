import { EDIT_RESUME_NAME_SPACE, IEditResumeModel } from "@/models/edit-resume"
import { Button, Col, Input, message, Row, Space, Tag } from "antd"
import { connect } from "dva";
import { ContentConfigKeyEnum } from "../../config";
import QuillEditor from "@/components/quill-editor";
import { useState } from "react";
export interface IHobbySetFormProps {
  dispatch: React.Dispatch<any>;
  hobby: IEditResumeModel['hobby'];
  infoModuleList: IEditResumeModel['moduleList'],
}

function HobbySetForm(props: IHobbySetFormProps) {
  const { infoModuleList, dispatch, hobby } = props;
  const [name, setName] = useState<string>('')
  const { data = [], content } = hobby ?? {}
  const title = infoModuleList?.find(item => item.key === ContentConfigKeyEnum.HOBBY)?.title ?? '';

  const onChangeContent = (value: string) => {
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.HOBBY,
        value: {
          ...hobby,
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
        key: ContentConfigKeyEnum.HOBBY,
        value: {
          ...hobby,
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
        key: ContentConfigKeyEnum.HOBBY,
        value: {
          ...hobby,
          data: data.filter((it, idx) => idx !== index)
        }
      }
    })
  }

  return (
    <div className="hobby-set-form-wrapper">
      <Row>
        <Space>
          <Input value={name} placeholder={`请输入${title}`} onChange={(e) => setName(e.target.value)}/>
          <Button type="primary" ghost onClick={onAdd}><i className='iconfont'>&#xe60c;</i>添加{title}</Button>
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
    hobby: editResume.hobby,
    infoModuleList: editResume.moduleList
  }
})(HobbySetForm)