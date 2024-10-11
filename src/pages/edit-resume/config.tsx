import { ColumnHeightOutlined, SkinOutlined, TranslationOutlined } from '@ant-design/icons'
import { ReactNode } from 'react';
import { IInfoIconConfig, IRightTabConfig } from './types';
export enum ThemeConfigKeyEnum {
  SPACEING = "spacing",
  SKIN = "skin",
  LANGUAGE = "language"
}
export const leftIconConfig: IInfoIconConfig[] = [
  {
    title: '间距设置',
    key: ThemeConfigKeyEnum.SPACEING,
    icon: <ColumnHeightOutlined />
  },
  {
    title: '皮肤设置',
    key: ThemeConfigKeyEnum.SKIN,
    icon: <SkinOutlined />
  },
  {
    title: '语言/字体',
    key: ThemeConfigKeyEnum.LANGUAGE,
    icon: <TranslationOutlined />
  },
]

export enum ContentConfigKeyEnum {
  /** 头部 */
  CV_HEADER = "cvHeader",
  /** 基础信息 */
  BASIC_INFO = "basicInfo",
  /** 工作经历 */
  WORK_EXPERIENCE = "workExperience",
  /** 教育经历 */
  EDUCATION = "education",
  /** 项目经历 */
  PROJECT_EXPERIENCE = "projectExperience",
  /** 个人技能 */
  SKILLS = "skills",
  /** 荣誉奖项 */
  HONOR = "honor",
  /** 求职意向 */
  INTENTION = "intention",
  /** 自我评价 */
  SELF_EVALUATION = "selfEvaluation"
}

/** 右侧tab配置 */
export const rightTabConfig: IRightTabConfig[] = [
  {
    title: '信息模块',
    key: 'infoModule'
  }
]

/** 模块信息列表 */
export const infoModuleList: IInfoIconConfig[] = [
  {
    title: '基本信息',
    key: ContentConfigKeyEnum.BASIC_INFO,
    icon: <ColumnHeightOutlined />,
    hidden: false,
  },
  {
    title: '教育经历',
    key: ContentConfigKeyEnum.EDUCATION,
    icon: <ColumnHeightOutlined />
  },
  {
    title: '工作经历',
    key: ContentConfigKeyEnum.WORK_EXPERIENCE,
    icon: <ColumnHeightOutlined />
  },
  {
    title: '项目经历',
    icon: <ColumnHeightOutlined />,
    key: ContentConfigKeyEnum.PROJECT_EXPERIENCE,
  },
  {
    title: '个人技能',
    icon: <ColumnHeightOutlined />,
    key: ContentConfigKeyEnum.SKILLS,
  },
  {
    title: '荣誉奖项',
    icon: <ColumnHeightOutlined />,
    key: ContentConfigKeyEnum.HONOR,
  },
  {
    title: '自我评价',
    icon: <ColumnHeightOutlined />,
    key: ContentConfigKeyEnum.SELF_EVALUATION,
  },
  {
    title: '求职意向',
    icon: <ColumnHeightOutlined />,
    key: ContentConfigKeyEnum.INTENTION,
  }
]

/** 模块图标映射 */
export const infoModuleIconMap = new Map<string, ReactNode>([
  [ContentConfigKeyEnum.BASIC_INFO, <ColumnHeightOutlined />],
  [ContentConfigKeyEnum.EDUCATION, <ColumnHeightOutlined />],
  [ContentConfigKeyEnum.WORK_EXPERIENCE, <ColumnHeightOutlined />],
  [ContentConfigKeyEnum.PROJECT_EXPERIENCE, <ColumnHeightOutlined />],
  [ContentConfigKeyEnum.SKILLS, <ColumnHeightOutlined />],
  [ContentConfigKeyEnum.SELF_EVALUATION, <ColumnHeightOutlined />],
  [ContentConfigKeyEnum.EDUCATION, <ColumnHeightOutlined />],
  [ContentConfigKeyEnum.HONOR, <ColumnHeightOutlined />],
  [ContentConfigKeyEnum.INTENTION, <ColumnHeightOutlined />],
])

