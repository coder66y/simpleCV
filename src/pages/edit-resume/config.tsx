import { ReactNode } from 'react';
import { FormatDateOptions } from 'react-intl';

// Types
export interface ILeftInfoIconConfig {
  title: string;
  type: 'pop' | 'modal';
  key: ThemeConfigKeyEnum;
  icon: ReactNode;
}

export interface IRightTabConfig {
  title: string;
  key: string;
}

export interface IModuleInfoConfig {
  title: string;
  originalTitle: string;
  key: ContentConfigKeyEnum;
  hidden?: boolean;
}

// Enums
export enum ThemeConfigKeyEnum {
  SPACING = 'spacing',
  SKIN = 'skin',
  LANGUAGE = 'language',
  TEMPLATE = 'template',
}

export enum ContentConfigKeyEnum {
  CV_INFO = 'cvInfo',
  BASIC_INFO = 'basicInfo',
  WORK_EXPERIENCE = 'workExperience',
  EDUCATION = 'education',
  INTERNSHIP_EXPERIENCE = 'internshipExperience',
  SCHOOL_EXPERIENCE = 'schoolExperience',
  PROJECT_EXPERIENCE = 'projectExperience',
  SKILLS = 'skills',
  HONOR = 'honors',
  CUSTOMIZATION = 'customization',
  HOBBY = 'hobby',
  SELF_EVALUATION = 'selfEvaluation',
}

export enum SortTypeEnum {
  UP = 'UP',
  DOWN = 'DOWN',
  DELETE = 'DELETE',
}

// Constants
export const DATE_FORMAT_CONFIG: FormatDateOptions = {
  month: 'short',
  year: 'numeric',
};

// Theme Configuration
export const THEME_CONFIG = {
  leftIcons: [
    {
      title: '间距设置',
      type: 'pop',
      key: ThemeConfigKeyEnum.SPACING,
      icon: <i className="iconfont">&#xe614;</i>,
    },
    {
      title: '皮肤设置',
      type: 'pop',
      key: ThemeConfigKeyEnum.SKIN,
      icon: <i className="iconfont">&#xe91e;</i>,
    },
    {
      title: '语言/字体',
      type: 'pop',
      key: ThemeConfigKeyEnum.LANGUAGE,
      icon: <i className="iconfont">&#xe605;</i>,
    },
    {
      title: '更换模板',
      type: 'modal',
      key: ThemeConfigKeyEnum.TEMPLATE,
      icon: <i className="iconfont">&#xe652;</i>,
    },
  ] as ILeftInfoIconConfig[],

  rightTabs: [
    {
      title: '信息模块',
      key: 'infoModule',
    },
  ] as IRightTabConfig[],
};

// Module Configuration
export const MODULE_CONFIG = {
  list: [
    {
      title: '基本信息',
      originalTitle: '基本信息',
      key: ContentConfigKeyEnum.BASIC_INFO,
      hidden: false,
    },
    {
      title: '教育经历',
      originalTitle: '教育经历',
      key: ContentConfigKeyEnum.EDUCATION,
    },
    {
      title: '校园经历',
      originalTitle: '校园经历',
      key: ContentConfigKeyEnum.SCHOOL_EXPERIENCE,
    },
    {
      title: '工作经历',
      originalTitle: '工作经历',
      key: ContentConfigKeyEnum.WORK_EXPERIENCE,
    },
    {
      title: '实习经历',
      originalTitle: '实习经历',
      key: ContentConfigKeyEnum.INTERNSHIP_EXPERIENCE,
    },
    {
      title: '项目经历',
      originalTitle: '项目经历',
      key: ContentConfigKeyEnum.PROJECT_EXPERIENCE,
    },
    {
      title: '技能特长',
      originalTitle: '技能特长',
      key: ContentConfigKeyEnum.SKILLS,
    },
    {
      title: '荣誉证书',
      originalTitle: '荣誉证书',
      key: ContentConfigKeyEnum.HONOR,
    },
    {
      title: '兴趣爱好',
      originalTitle: '兴趣爱好',
      key: ContentConfigKeyEnum.HOBBY,
    },
    {
      title: '自我评价',
      originalTitle: '自我评价',
      key: ContentConfigKeyEnum.SELF_EVALUATION,
    },
    {
      title: '自定义',
      originalTitle: '自定义',
      key: ContentConfigKeyEnum.CUSTOMIZATION,
    },
  ] as IModuleInfoConfig[],

  icons: new Map<string, ReactNode>([
    [ContentConfigKeyEnum.BASIC_INFO, <i className="iconfont">&#xe60a;</i>],
    [ContentConfigKeyEnum.EDUCATION, <i className="iconfont">&#xe656;</i>],
    [ContentConfigKeyEnum.WORK_EXPERIENCE, <i className="iconfont">&#xe63c;</i>],
    [ContentConfigKeyEnum.SCHOOL_EXPERIENCE, <i className="iconfont">&#xe689;</i>],
    [ContentConfigKeyEnum.PROJECT_EXPERIENCE, <i className="iconfont">&#xe615;</i>],
    [ContentConfigKeyEnum.SKILLS, <i className="iconfont">&#xe60f;</i>],
    [ContentConfigKeyEnum.SELF_EVALUATION, <i className="iconfont">&#xe61b;</i>],
    [ContentConfigKeyEnum.HONOR, <i className="iconfont">&#xe619;</i>],
    [ContentConfigKeyEnum.HOBBY, <i className="iconfont">&#xe62a;</i>],
    [ContentConfigKeyEnum.CUSTOMIZATION, <i className="iconfont">&#xeb6a;</i>],
    [ContentConfigKeyEnum.INTERNSHIP_EXPERIENCE, <i className="iconfont">&#xe648;</i>],
  ]),
};

// Form Options
export const FORM_OPTIONS = {
  workAge: [
    { value: '', label: '不填' },
    { value: 'graduate', label: '应届生' },
    { value: 'within1YearExperience', label: '一年经验以内' },
    { value: '2YearExperience', label: '两年经验' },
    { value: '3YearExperience', label: '3年经验' },
    { value: '4YearExperience', label: '4年经验' },
    { value: '5YearExperience', label: '5年经验' },
    { value: '6YearExperience', label: '6年经验' },
    { value: '7YearExperience', label: '7年经验' },
    { value: '8YearExperience', label: '8年经验' },
    { value: '9YearExperience', label: '9年经验' },
    { value: 'over10YearExperience', label: '10年及以上经验' },
  ],

  maritalStatus: [
    { value: '', label: '不填' },
    { value: 'single', label: '未婚' },
    { value: 'married', label: '已婚' },
    { value: 'divorced', label: '离异' },
    { value: 'widowed', label: '丧偶' },
  ],

  boolean: [
    { value: true, label: '是' },
    { value: false, label: '否' },
  ],

  political: [
    { value: '', label: '不填' },
    { value: 'citizen', label: '普通公民' },
    { value: 'masses', label: '群众' },
    { value: 'partyMember', label: '中共党员' },
    { value: 'probationaryParty', label: '中共预备党员' },
    { value: 'leagueMember', label: '共青团员' },
  ],

  gender: [
    { value: '', label: '不填' },
    { value: 'male', label: '男' },
    { value: 'female', label: '女' },
  ],

  signIn: [
    { value: '', label: '不填' },
    { value: 'immediately', label: '随时到岗' },
    { value: 'within1Week', label: '一周内到岗' },
    { value: 'within2Weeks', label: '两周内到岗' },
    { value: 'within1month', label: '一月内到岗' },
    { value: 'toBeDetermined', label: '另议' },
  ],

  degree: [
    { value: '', label: '不填' },
    { value: 'primary', label: '小学' },
    { value: 'middle', label: '初中' },
    { value: 'junior', label: '高中' },
    { value: 'senior', label: '中专' },
    { value: 'college', label: '大专' },
    { value: 'university', label: '本科' },
    { value: 'master', label: '硕士' },
    { value: 'doctor', label: '博士' },
    { value: 'others', label: '其他' },
  ],

  mastery: [
    { value: 0.5, label: '一般' },
    { value: 0.65, label: '良好' },
    { value: 0.75, label: '熟练' },
    { value: 0.85, label: '擅长' },
    { value: 0.95, label: '精通' },
  ],
};
