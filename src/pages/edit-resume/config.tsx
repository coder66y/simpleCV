import { AuditOutlined, ColumnHeightOutlined, FileAddOutlined, FileTextOutlined, HeartOutlined, HomeOutlined, IdcardOutlined, ProfileOutlined, ProjectOutlined, SkinOutlined, SolutionOutlined, TranslationOutlined, UserOutlined, VerifiedOutlined } from '@ant-design/icons'
import { ReactNode } from 'react';
import { ILeftInfoIconConfig, IRightTabConfig, IModuleInfoConfig } from './types';
export enum ThemeConfigKeyEnum {
  SPACEING = "spacing",
  SKIN = "skin",
  LANGUAGE = "language"
}
export const leftIconConfig: ILeftInfoIconConfig[] = [
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

/** 内容模块枚举 */
export enum ContentConfigKeyEnum {
  /** 头部 */
  CV_INFO = "cvInfo",
  /** 基础信息 */
  BASIC_INFO = "basicInfo",
  /** 工作经历 */
  WORK_EXPERIENCE = "workExperience",
  /** 教育经历 */
  EDUCATION = "education",
  /** 实习经验 */
  INTERNSHIP_EXPERIENCE = 'internshipExperience',
  /** 校园经验 */
  SCHOOL_EXPERIENCE = 'schoolExperience',
  /** 项目经历 */
  PROJECT_EXPERIENCE = "projectExperience",
  /** 个人技能 */
  SKILLS = "skills",
  /** 荣誉奖项 */
  HONOR = "honors",
  /** 自定义 */
  CUSTOMIZATION = "customization",
  /** 兴趣爱好 */
  HOBBY = 'hobby',
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
export const infoModuleList: IModuleInfoConfig[] = [
  {
    title: '基本信息',
    key: ContentConfigKeyEnum.BASIC_INFO,
    hidden: false,
  },
  {
    title: '教育经历',
    key: ContentConfigKeyEnum.EDUCATION,
  },
  {
    title: '校园经历',
    key: ContentConfigKeyEnum.SCHOOL_EXPERIENCE,
  },
  {
    title: '工作经历',
    key: ContentConfigKeyEnum.WORK_EXPERIENCE,
  },
  {
    title: '实习经历',
    key: ContentConfigKeyEnum.INTERNSHIP_EXPERIENCE,
  },
  {
    title: '项目经历',
    icon: <ColumnHeightOutlined />,
    key: ContentConfigKeyEnum.PROJECT_EXPERIENCE,
  },
  {
    title: '技能特长',
    key: ContentConfigKeyEnum.SKILLS,
  },
  {
    title: '荣誉证书',
    key: ContentConfigKeyEnum.HONOR,
  },
  {
    title: '兴趣爱好',
    key: ContentConfigKeyEnum.HOBBY,
  },
  {
    title: '自我评价',
    key: ContentConfigKeyEnum.SELF_EVALUATION,
  },
  {
    title: '自定义',
    key: ContentConfigKeyEnum.CUSTOMIZATION,
  }
]

/** 模块图标映射 */
export const infoModuleIconMap = new Map<string, ReactNode>([
  [ContentConfigKeyEnum.BASIC_INFO, <UserOutlined />],
  [ContentConfigKeyEnum.EDUCATION, <AuditOutlined />],
  [ContentConfigKeyEnum.WORK_EXPERIENCE, <ColumnHeightOutlined />],
  [ContentConfigKeyEnum.SCHOOL_EXPERIENCE,<HomeOutlined />],
  [ContentConfigKeyEnum.PROJECT_EXPERIENCE, <ProjectOutlined />],
  [ContentConfigKeyEnum.SKILLS, <ProfileOutlined />],
  [ContentConfigKeyEnum.SELF_EVALUATION, <SolutionOutlined />],
  [ContentConfigKeyEnum.HONOR, <VerifiedOutlined />],
  [ContentConfigKeyEnum.HOBBY, <HeartOutlined />],
  [ContentConfigKeyEnum.CUSTOMIZATION, <FileAddOutlined />],
  [ContentConfigKeyEnum.INTERNSHIP_EXPERIENCE, <FileTextOutlined />],
])


export enum SortTypeEnum {
  UP = 'up',
  DOWN = 'down',
  DELETE = 'delete',
}

