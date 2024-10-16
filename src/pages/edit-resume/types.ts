import { ContentConfigKeyEnum, ThemeConfigKeyEnum } from "./config";

/** 信息模块类型 */
export interface IInfoIconConfig {
  title: string;
  key: ThemeConfigKeyEnum;
  icon: React.ReactNode;
  hidden?: boolean;
  sort?: number;
}
export interface ModuleInfoConfig {
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