import { Button, Input, message, Modal } from "antd";
import { ModalProps } from "antd/lib";
import CVHeaderSetForm from "./cv-header-set-form";
import { ContentConfigKeyEnum } from "../../config";
import './index.less'
import BaseInfoSetForm from "./base-info-set-form";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useClickAway } from "ahooks";
import EducationSetForm from "./education-set-form";
import WorkExperienceSetForm from "./work-experience-set-form";
import ProjectExperienceSetForm from "./project-experience-set-form";
import SchoolExperienceSetForm from "./school-experience-set-form";
import InternshipExperienceSetForm from "./internship-experience-set-form";
import SkillsSetForm from "./skill-set-form";
import HonorSetForm from "./honor-set-form";
import SelfEvaluationSetForm from "./self-evaluation-set-form";
import CustomizationSetForm from "./customization-set-form";
import HobbySetForm from "./hobby-set-form";
import { connect } from "dva";
import { EDIT_RESUME_NAME_SPACE, IEditResumeModel } from "@/models/edit-resume";

export interface IContentEditModalProps extends ModalProps{
  configKey: ContentConfigKeyEnum;
  visible: boolean;
  title?: string;
  dispatch: React.Dispatch<any>;
}

function ContentEditModal(props: IContentEditModalProps) {
  const { configKey, visible, title, dispatch } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const formMap = new Map<ContentConfigKeyEnum, React.ReactNode>([
    [ContentConfigKeyEnum.CV_INFO, <CVHeaderSetForm />],
    [ContentConfigKeyEnum.BASIC_INFO, <BaseInfoSetForm />],
    [ContentConfigKeyEnum.EDUCATION, <EducationSetForm />],
    [ContentConfigKeyEnum.WORK_EXPERIENCE, <WorkExperienceSetForm />],
    [ContentConfigKeyEnum.PROJECT_EXPERIENCE, <ProjectExperienceSetForm />],
    [ContentConfigKeyEnum.SCHOOL_EXPERIENCE, <SchoolExperienceSetForm />],
    [ContentConfigKeyEnum.INTERNSHIP_EXPERIENCE, <InternshipExperienceSetForm />],
    [ContentConfigKeyEnum.SKILLS, <SkillsSetForm />],
    [ContentConfigKeyEnum.HONOR, <HonorSetForm />],
    [ContentConfigKeyEnum.SELF_EVALUATION, <SelfEvaluationSetForm />],
    [ContentConfigKeyEnum.CUSTOMIZATION, <CustomizationSetForm />],
    [ContentConfigKeyEnum.HOBBY, <HobbySetForm />],
   ])
   
  const changeModuleTitle = (title: string) => {
    props.dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeModuleTitle`,
      payload: {
        key: configKey,
        title,
      }
    })
  }

  const onClose = () => {
    dispatch?.({
      type: `${EDIT_RESUME_NAME_SPACE}/changeContentEditModalVisible`,
      payload: {
        visible: false
      }
    })
  }


  useClickAway(() => {
    setIsEditing(false)
  }, document.getElementById('module-title-edit-input'))

  const renderTitle = () => {
    return (
      <div className="module-edit-modal-title">
        {
          isEditing ? <Input
            id="module-title-edit-input"
            value={title}
            onChange={(e) => {
              const value = e.target.value;
              if(value.length > 30) {
                message.warning('标题长度推荐在30个字内')
                return
              }
              changeModuleTitle?.(e.target.value)
            }} /> : title
        }
        {
          isEditing
          ? <CheckOutlined  onClick={() => {setIsEditing(false)}}/>
          : <EditOutlined onClick={() => {setIsEditing(true)}} />
        }
      </div>
    )
  }

  const renderFooter = () => {
    return <div>
      <Button type='primary' onClick={() => {
      onClose?.()
    }}>保存</Button>
    </div>
  }

  return (
    <Modal
      className='content-edit-modal'
      open={visible}
      title={configKey === ContentConfigKeyEnum.CV_INFO ? null : renderTitle()}
      footer={renderFooter()}
      onCancel={onClose}
    >
      {
        formMap.get(configKey)
      }
    </Modal>
  )
}

export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    configKey: editResume.currentEditContent?.key,
    title: editResume.currentEditContent?.title,
    visible: editResume.contentEditModalVisible,
  }
})(ContentEditModal)