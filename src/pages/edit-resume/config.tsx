import { ColumnHeightOutlined, SkinOutlined, TranslationOutlined } from '@ant-design/icons'

export interface IInfoIconConfig {
  title: string;
  key: string;
  icon: React.ReactNode;
  hidden?: boolean;
  sort?: number;
}
export const leftIconConfig: IInfoIconConfig[] = [
  {
    title: '间距设置',
    key: 'spacing',
    icon: <ColumnHeightOutlined />
  },
  {
    title: '皮肤设置',
    key: 'skin',
    icon: <SkinOutlined />
  },
  {
    title: '语言/字体',
    key: 'language',
    icon: <TranslationOutlined />
  },
]
export interface IRightTabConfig {
  title: string;
  key: string;
}
export const rightTabConfig: IRightTabConfig[] = [
  {
    title: '信息模块',
    key: 'infoModule'
  },
  {
    title: '排序设置',
    key: 'sortSetting'
  }
]

export const infoModuleList: IInfoIconConfig[] = [
  {
    title: '基本信息',
    key: 'basicInfo',
    icon: <ColumnHeightOutlined />,
    hidden: false,
  },
  {
    title: '教育经历',
    key: 'education',
    icon: <ColumnHeightOutlined />
  },
  {
    title: '工作经历',
    key: 'workExperience',
    icon: <ColumnHeightOutlined />
  },
  {
    title: '项目经历',
    icon: <ColumnHeightOutlined />,
    key: 'projectExperience',
  },
  {
    title: '个人技能',
    icon: <ColumnHeightOutlined />,
    key: 'skills',
  },
  {
    title: '荣誉奖项',
    icon: <ColumnHeightOutlined />,
    key: 'honor',
  },
  {
    title: '自我评价',
    icon: <ColumnHeightOutlined />,
    key: 'evaluation',
  },
  {
    title: '求职意向',
    icon: <ColumnHeightOutlined />,
    key: 'intention',
  }
]

