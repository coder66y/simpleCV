import { infoModuleList } from "@/pages/edit-resume/config";
import { IInfoIconConfig } from "@/pages/edit-resume/types";
import { arrayMove } from "@dnd-kit/sortable";

const initState = () => ({
  moduleList: infoModuleList,
})
export interface IEditResumeModel {
  moduleList: IInfoIconConfig[];
}
export default {
  namespace: 'editResume',
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
    }
  },
};

