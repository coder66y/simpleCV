import EditContent from "./components/edit-content";
import EditLeft from "./components/edit-left";
import EditRight from "./components/edit-right";
import ThreeColumnLayout from "@/components/three-column-layout";
import './index.less'
import { Reducer, useReducer } from "react";
import { infoModuleList } from "./config";
import { arrayMove } from "@dnd-kit/sortable";
import Header from "./components/header";
import { ThemeProvider } from './store/theme-context';
import { IInfoIconConfig, IModuleDataDispatchArgType } from "./types";

const infoModuleReducer: Reducer<IInfoIconConfig[], IModuleDataDispatchArgType> = (state, action) => {
  const { type, payload } = action;
  if(type === 'reset') {
    return infoModuleList
  }
  if(type === 'changeHidden') {
    return state.map(item => {
      if(item.key === payload?.key) {
        return {
          ...item,
          hidden: !item.hidden
        }
      }
      return item;
    })
  }
  if(type === 'sort') {
   return arrayMove(state, payload?.oldIndex, payload?.newIndex)
  }
  return state;
}

export default function EditResume() {
  const [moduleList, dispatch] = useReducer(infoModuleReducer, infoModuleList, () => infoModuleList)
  return (
    <ThemeProvider>
      <div className="edit-cv-header">
        <Header />
      </div>
      <ThreeColumnLayout gap={20} className="edit-cv-container">
        <EditLeft data-width={"auto"}></EditLeft>
        <EditContent moduleList={moduleList} dispatch={dispatch} data-width="auto"></EditContent>
        <EditRight moduleList={moduleList} dispatch={dispatch} data-width={200}></EditRight>
      </ThreeColumnLayout>
    </ThemeProvider>
  )
}