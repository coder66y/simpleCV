import { Color } from "antd/es/color-picker";

/** 间距设置props */
export interface ISpaceSetFormValues {
  /** 页面边距 */
  pageMargin?: number;
  /** 行间距 */
  lineHeight?: number;
  /** 模块间距 */
  moduleMargin?: number;
}

/** 皮肤设置props */
export interface ISkinSetFormValues {
  color?: Color;
  secondaryColor?: Color;
}

export interface ILanguageSetFormValues {
  language?: string;
  fontFamily?: string;
  fontSize?: number;
}