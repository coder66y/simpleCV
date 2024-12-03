import { ContentConfigKeyEnum, ThemeConfigKeyEnum } from "./config";

/** 右侧主题信息类型 */
export interface ILeftInfoIconConfig {
  title: string;
  key: ThemeConfigKeyEnum;
  icon: React.ReactNode;
  hidden?: boolean;
  sort?: number;
}

/** 内容模块类型配置类型 */
export interface IModuleInfoConfig {
  originalTitle?: string;
  /** 是否编辑过 */
  edited?: boolean;
  title?: string;
  key: ContentConfigKeyEnum;
  icon?: React.ReactNode;
  hidden?: boolean;
  sort?: number;
}


export type IModuleDataDispatchArgType = {
  type: string; 
  payload?: Record<string,any>
}

export interface IRightTabConfig {
  title: string;
  key: string;
}