import { photo } from "@/assets";
import { ContentConfigKeyEnum, infoModuleList } from "@/pages/edit-resume/config";
import { IModuleInfoConfig } from "@/pages/edit-resume/types";
import { arrayMove } from "@dnd-kit/sortable";

export const EDIT_RESUME_NAME_SPACE = "editResume"
const initState = () => ({
  moduleList: infoModuleList,
  resumeInfo: {
    title: '个人简历',
    slogan: '求职意向：前端工程师',
  },
  baseInfo: {
    "name": "陆一",
    "birthday": "1999-02-15",
    "age": 18,
    "gender": "女",
    "phone": "13800000000",
    "email": "2190389887@qq.com",
    "photo": photo,
    "photoShow": true,
    "workAge": "3年经验",
    "height": "155",
    "weight": "45",
    "nationality": "布依族",
    "nativePlace": "成都",
    "maritalStatus": "未婚",
    "political": "普通公民",
    city: '成都',
    joinTime: '一周内到岗',
    post: '前端开发工程师',
    salary: '13-18'
  },
  educationInfo: {
    content: "<ol>\n<li>主修课程：</li>\n<li>管理学、微观经济学、宏观经济学、管理信息系统、统计学、会计学、财务管理、市场营销、经济法、消费者行为学、国际市场营销</li>\n</ol>",
    degree: "本科",
    end: "2009-06",
    major: "市场营销",
    name: "上海熊猫大学 11",
    start: "2005-06",
    today: true
  }
})

/** 教育经历类型 */
export interface IEducationInfoValues {
  content: string;
  degree: string;
  end: string;
  major: string;
  name: string;
  start: string;
  today: boolean;
}
export interface IEditResumeModel {
  moduleList: IModuleInfoConfig[];
  resumeInfo?: {
    title?: string;
    slogan?: string;
  },
  /** 个人信息 */
  baseInfo?: {
    age?: string;
    birthday?: string;
    gender?: string;
    height?: string;
    name: string;
    phone: string;
    email: string; 
    /** 婚姻状态 */ 
    maritalStatus?: string;
    /** 民族 */
    nationality?: string;
    /** 籍贯 */
    nativePlace?: string;
    photo?: string;
    /** 是否展示图片 */
    photoShow?: boolean;
    /** 政治身份 */
    political?: string;
    weight?: string;
    /** 工作经验 */
    workAge?: string;
    city: string;
    joinTime: string;
    post: string;
    salary: string;
  },
  educationInfo: IEducationInfoValues[]
}
export default {
  namespace: EDIT_RESUME_NAME_SPACE,
  state: initState(),

  effects: {
  },

  reducers: {
    reset() {
      return initState()
    },
    changeModuleHidden(state: IEditResumeModel, { payload }: {payload: {key: string}}) {
      const { moduleList, ...other } = state;
      const newList = moduleList.map(item => {
        if(item.key === payload?.key) {
          return {
            ...item,
            hidden: !item.hidden
          }
        }
        return item;
      })
      return {
        ...other,
        moduleList: newList
      }
    },
    sortModule(state: IEditResumeModel, { payload }: {payload: {oldIndex: number, newIndex: number}}) {
      const {moduleList, ...other } = state;
      const newList =  arrayMove(moduleList, payload?.oldIndex, payload?.newIndex) 
      return {
        ...other,
        moduleList: newList
      }
    },
    changeModuleTitle(state: IEditResumeModel, { payload }: {payload: {key: ContentConfigKeyEnum, title: string}}) {
      return {
        ...state,
        moduleList: state.moduleList.map(item => {
          if(item.key === payload?.key) {
            return {
              ...item,
              title: payload?.title
            }
          }
          return item;
        })
      }
    },
    changeFormValues(state: IEditResumeModel, { payload }: {payload: {key: keyof IEditResumeModel, value: Record<string, any>}}) {
      const { key, value } = payload;
      return {
        ...state,
        [key]: {
          ...state[key],
          ...value,
        }
      }
    }
  },
};

