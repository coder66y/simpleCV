import { photo } from "@/assets";
import { ContentConfigKeyEnum, infoModuleList, SortTypeEnum } from "@/pages/edit-resume/config";
import { IModuleInfoConfig } from "@/pages/edit-resume/types";
import { arrayMove } from "@dnd-kit/sortable";

export const EDIT_RESUME_NAME_SPACE = "editResume"

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
export interface IWorkExperienceValues {
  content: string;
  end: string;
  job: string;
  name: string;
  start: string;
  today: boolean;
}
export interface IProjectExperienceValues {
  content: string;
  end: string;
  job: string;
  name: string;
  start: string;
  today: boolean;
}
export interface ISchoolExperienceValues {
  content: string;
  end: string;
  job: string;
  name: string;
  start: string;
  today: boolean;
}
export interface IInternshipExperienceValues {
  content: string;
  end: string;
  job: string;
  name: string;
  start: string;
  today: boolean;
}
export interface IBarChartItem {
  name: string;
  mastery: {
    value: string;
    label: string;
  };
  showBar: boolean;
}
export interface ISkillsValues {
  data: IBarChartItem[],
  content: string;
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
  education: IEducationInfoValues[],
  workExperience: IWorkExperienceValues[],
  projectExperience: IProjectExperienceValues[],
  schoolExperience: ISchoolExperienceValues[],
  internshipExperience: IInternshipExperienceValues[],
  skills: ISkillsValues,
  // honor: IHonorInfoValues[],
}

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
  education: [{
    content: "<p> 主修课程： 管理学、微观经济学、宏观经济学、管理信息系统、统计学、会计学、财务管理、市场营销、经济法、消费者行为学、国际市场营销 </p>",
    degree: "本科",
    end: "2017-06",
    major: "xx专业",
    name: "xx大学 ",
    start: "2017-09",
    today: true
  }],
  workExperience: [
    {
      "name": "xxx公司",
      "job": "xxx职位",
      "start": "2024-06",
      "end": "2024-06",
      "today": true,
      "content": "<p>担任什么角色，做了什么，得到了什么样的结果</p>",
    }
  ],
  projectExperience: [
    {
      "name": "xx项目",
      "job": "xx角色",
      "start": "2024-01",
      "end": "",
      "today": true,
      "content": "<p>在什么项目里，担任什么角色，做了什么，获得什么结果</p>",
    }
  ],
  schoolExperience: [
    {
      "name": "什么学校",
      "job": "什么社团职位",
      "start": "2024-11",
      "end": "",
      "today": true,
      "content": "<p>什么时候组织了什么活动，规模多少，获得了什么结果</p>",
    }
  ],
  internshipExperience: [
    {
      "name": "xx公司",
      "job": "xxx实习生",
      "start": "2024-02",
      "end": "",
      "today": true,
      "content": "<p>工作内容是什么，收获是什么</p>",
    }
  ],
  skills: {
    data: [
      {
        name: "xxx技能",
        showBar: true,
        mastery: {value: 50, label: '一般'},
      },
      {
        name: "xxx技能1",
        showBar: false,
        mastery: {value: 50, label: '一般'},
      },
      {
        name: "xxx超长超长超长超长技能2",
        showBar: false,
        mastery: {value: 50, label: '一般'},
      }
    ],
    content: "<p>技能特长描述</p>"
  }
})
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
    changeFormValues(state: IEditResumeModel, { payload }: {payload: {key: keyof IEditResumeModel, value: Record<string, any> | Record<string, any>[]}}) {
      const { key, value } = payload;
      return {
        ...state,
        [key]: Array.isArray(value) ? value : {
          ...state[key],
          ...value,
        }
      }
    },
    sortModuleFormValues(state: IEditResumeModel, { payload }: {payload: {key: keyof IEditResumeModel, type: SortTypeEnum, index: number}}) {
      const { key, type, index } = payload;
      if(!Array.isArray(state[key])) {
        console.error('只有数组类型可交换顺序')
        return
      }
      let newValueList = [...state[key]]
      if(type === SortTypeEnum.DOWN) {
        newValueList = arrayMove(state[key], index, index + 1)
      } else if(type === SortTypeEnum.UP) {
        newValueList = arrayMove(state[key], index, index - 1)
      } else {
        newValueList = newValueList.filter((_, i) => i !== index)
      }
      return {
        ...state,
        [key]: newValueList
      }
    },
  },
};

