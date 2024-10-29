import { ContentConfigKeyEnum } from "../../config";
import BaseInfo from "./base-info";
import EducationInfo from "./education-info";
import './index.less'

export interface IShowModuleContentProps {
  configKey?: ContentConfigKeyEnum;
}

const rootClassName = 'show-module-content-wrapper'
export default function ShowModuleContent(props: IShowModuleContentProps) {
  const { configKey } = props;

  const moduleMap = new Map<ContentConfigKeyEnum, React.ReactNode>([
    [ContentConfigKeyEnum.BASIC_INFO, <BaseInfo />],
    [ContentConfigKeyEnum.EDUCATION, <EducationInfo />],
  ])

  return (
    <div className={rootClassName}>
      {
       configKey ? moduleMap.get(configKey) : null
      }
    </div>
  )
}