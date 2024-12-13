import { Modal, Popover, PopoverProps } from "antd";
import { ThemeConfigKeyEnum } from "../../config";
import { useState } from "react";
import './index.less'
import { SpaceSetForm } from "./space-set-form";
import { SkinSetForm } from "./skin-set-form";
import { LanguageSetForm } from "./language-set-form";
import TemplateSetForm from "./template-set-form";
export interface IThemeConfigPopProps {
  configKey: ThemeConfigKeyEnum;
  title: string;
  className?: string;
  placement?: PopoverProps['placement']
  trigger?: PopoverProps['trigger'];
  children: React.ReactNode;
  type: 'pop' | 'modal';
}
export default function ThemeConfigPop(props: IThemeConfigPopProps) {
  const { configKey, className, children, type,title, ...other } = props;
  const [open, setOpen] = useState<boolean>(false);

  const formMap = new Map([
   [ThemeConfigKeyEnum.SPACEING, <SpaceSetForm />],
   [ThemeConfigKeyEnum.SKIN, <SkinSetForm />],
   [ThemeConfigKeyEnum.LANGUAGE, <LanguageSetForm />],
   [ThemeConfigKeyEnum.TEMPLATE, <TemplateSetForm />]
  ])

  if(type === 'pop') {
    return (
      <Popover
        {...other}
        title={title}
        content={formMap.get(configKey)}
        open={open}
        className={`${className} ${open ? 'active-pop' : ''}`}
        onOpenChange={() => {
          setOpen(!open)
        }}>
        {children}
      </Popover>
    )
  } else {
    return <>
      <Modal
        title={title}
        open={open}
        footer={null}
        maskClosable
        onCancel={() => {
          setOpen(false)
        }}
      >
        {formMap.get(configKey)}
      </Modal>
      <div className={className} onClick={() => setOpen(true)}>
        {children}
      </div>
    </>
  }
}