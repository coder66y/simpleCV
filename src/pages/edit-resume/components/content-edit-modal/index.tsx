import { Modal } from "antd";
import { ModalProps } from "antd/lib";
import CVHeaderSetForm from "./cv-header-set-form";
import { ContentConfigKeyEnum } from "../../config";

export interface IContentEditModalProps extends ModalProps{
  configKey?: ContentConfigKeyEnum;
  className?: string;
  visible: boolean;
  onClose?: () => void;
  onOk?: () => void;
}

export default function ContentEditModal(props: IContentEditModalProps) {
  const { configKey, className, visible, onClose } = props;

  const formMap = new Map([
   ['cvHeader', <CVHeaderSetForm />],
  ])
  return (
    <Modal
      className={className}
      open={visible}
      onCancel={onClose}
    >
      {
        formMap.get(configKey || 'cvHeader')
      }
    </Modal>
  )
}