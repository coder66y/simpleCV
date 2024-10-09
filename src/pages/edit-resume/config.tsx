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
  CV_HEADER = "cvHeader",
  BASIC_INFO = "basicInfo",
  WORK_EXPERIENCE = "workExperience",
  EDUCATION = "education",
  PROJECT_EXPERIENCE = "projectExperience",
  SKILLS = "skills",
  HONOR = "honor",
  EVALUATION = "evaluation",
  INTENTION = "intention"
}

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
    key: ContentConfigKeyEnum.EDUCATION,
  },
  {
    title: '求职意向',
    icon: <ColumnHeightOutlined />,
    key: ContentConfigKeyEnum.INTENTION,
  }
]

export const infoModuleIconMap = new Map<string, ReactNode>([
  ['basicInfo', <ColumnHeightOutlined />],
  ['education', <ColumnHeightOutlined />],
  ['workExperience', <ColumnHeightOutlined />],
  ['projectExperience', <ColumnHeightOutlined />],
  ['skills', <ColumnHeightOutlined />],
  ['honor', <ColumnHeightOutlined />],
  ['evaluation', <ColumnHeightOutlined />],
  ['intention', <ColumnHeightOutlined />],
])

