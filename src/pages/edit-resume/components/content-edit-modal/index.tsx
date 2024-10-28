import { Button, Input, message, Modal } from "antd";
import { ModalProps } from "antd/lib";
import CVHeaderSetForm from "./cv-header-set-form";
import { ContentConfigKeyEnum } from "../../config";
import './index.less'
import BaseInfoSetForm from "./base-info-set-form";
import { CheckOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import { useClickAway } from "ahooks";

export interface IContentEditModalProps extends ModalProps{
  configKey: ContentConfigKeyEnum;
  visible: boolean;
  onClose?: () => void;
  title?: string;
  changeModuleTitle?: (title: string) => void;
}

export default function ContentEditModal(props: IContentEditModalProps) {
  const { configKey, visible, onClose, title, changeModuleTitle } = props;
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const formMap = new Map<ContentConfigKeyEnum, React.ReactNode>([
   [ContentConfigKeyEnum.CV_INFO, <CVHeaderSetForm />],
   [ContentConfigKeyEnum.BASIC_INFO, <BaseInfoSetForm />]
  ])

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
    return <Button type='primary' size="large" onClick={() => {
      onClose?.()
    }}>保存</Button>
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