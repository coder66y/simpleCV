import { EDIT_RESUME_NAME_SPACE, IEditResumeModel } from "@/models/edit-resume"
import { Col, Row } from "antd"
import { connect } from "dva";
import { ContentConfigKeyEnum } from "../../config";
import QuillEditor from "@/components/quill-editor";

export interface IHonorsSetFormProps {
  dispatch: React.Dispatch<any>;
  customization: IEditResumeModel['customization'];
  infoModuleList: IEditResumeModel['moduleList'],
}

function CustomizationSetForm(props: IHonorsSetFormProps) {
  const { infoModuleList, dispatch, customization } = props;
  const title = infoModuleList?.find(item => item.key === ContentConfigKeyEnum.CUSTOMIZATION)?.title ?? ''
  const onChangeContent = (value: string) => {
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.CUSTOMIZATION,
        value,
      }
    })
  }

  return (
    <div className="customization-set-form-wrapper">
      <Row>
        <Col span={24}>
          <div className="desc-title">{title}描述：</div>
          <QuillEditor value={customization} onChange={onChangeContent}/>
        </Col>
      </Row>
    </div>
  )
}

export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    customization: editResume.customization,
    infoModuleList: editResume.moduleList
  }
})(CustomizationSetForm)