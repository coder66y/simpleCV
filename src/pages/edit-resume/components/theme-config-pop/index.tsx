import { Popover, PopoverProps } from "antd";
import { ThemeConfigKeyEnum } from "../../config";
import { useState } from "react";
import './index.less'
import { SpaceSetForm } from "./space-set-form";
import { SkinSetForm } from "./skin-set-form";
import { LanguageSetForm } from "./language-set-form";

export interface IThemeConfigPopProps extends PopoverProps {
  configKey: ThemeConfigKeyEnum;
  children: React.ReactNode;
}
export default function ThemeConfigPop(props: IThemeConfigPopProps) {
  const { configKey, className, children, ...other } = props;
  const [open, setOpen] = useState<boolean>(false);

  const formMap = new Map([
   [ThemeConfigKeyEnum.SPACEING, <SpaceSetForm />],
   [ThemeConfigKeyEnum.SKIN, <SkinSetForm />],
   [ThemeConfigKeyEnum.LANGUAGE, <LanguageSetForm />]
  ])

  return (
    <Popover
      {...other}
      content={formMap.get(configKey)}
      open={open}
      className={`${className} ${open ? 'active-pop' : ''}`}
      onOpenChange={() => {
        setOpen(!open)
      }}>
      {children}
    </Popover>
  )
}