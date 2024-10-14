import { Modal } from "antd";
import { ModalProps } from "antd/lib";
import CVHeaderSetForm from "./cv-header-set-form";
import { ContentConfigKeyEnum } from "../../config";
import './index.less'
import BaseInfoSetForm from "./base-info-set-form";

export interface IContentEditModalProps extends ModalProps{
  configKey: ContentConfigKeyEnum;
  visible: boolean;
  onClose?: () => void;
}

export default function ContentEditModal(props: IContentEditModalProps) {
  const { configKey, visible, onClose } = props;

  const formMap = new Map<ContentConfigKeyEnum, React.ReactNode>([
   [ContentConfigKeyEnum.CV_INFO, <CVHeaderSetForm />],
   [ContentConfigKeyEnum.BASIC_INFO, <BaseInfoSetForm />]
  ])
  return (
    <Modal
      className='content-edit-modal'
      open={visible}
      footer={null}
      onCancel={onClose}
    >
      {
        formMap.get(configKey)
      }
    </Modal>
  )
}