import { Popover, PopoverProps } from "antd";
import { ThemeConfigKeyEnum } from "../../config";
import { useState } from "react";
import './index.less'
import { SpaceSetForm } from "./space-set-form";

export interface IThemeConfigPopProps extends PopoverProps {
  configKey: ThemeConfigKeyEnum;
  children: React.ReactNode;
}
export default function ThemeConfigPop(props: IThemeConfigPopProps) {
  const { configKey, className, children, ...other } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover
      {...other}
      content={<SpaceSetForm />}
      open={open}
      className={`${className} ${open ? 'active-pop' : ''}`}
      onOpenChange={() => {
        setOpen(!open)
      }}>
      {children}
    </Popover>
  )
}