import { infoModuleList } from "@/pages/edit-resume/config";
import { IInfoIconConfig } from "@/pages/edit-resume/types";
import { arrayMove } from "@dnd-kit/sortable";

export const EDIT_RESUME_NAME_SPACE = "editResume"
const initState = () => ({
  moduleList: infoModuleList,
  resumeInfo: {
    title: '个人简历',
    slogan: '求职意向：前端工程师',
  }
})
export interface IEditResumeModel {
  moduleList: IInfoIconConfig[];
  resumeInfo?: {
    title?: string;
    slogan?: string;
  },
  baseInfo?: {
    name: string;
    phone: string;
    height: string;
  }
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

