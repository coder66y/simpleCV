import EditContent from "./components/edit-content";
import EditLeft from "./components/edit-left";
import EditRight from "./components/edit-right";
import ThreeColumnLayout from "@/components/three-column-layout";
import 'normalize.css'
import './index.less'
import { useReducer } from "react";
import { IInfoIconConfig, infoModuleList } from "./config";
import { arrayMove } from "@dnd-kit/sortable";
import Header from "./components/header";

function reducer(state: IInfoIconConfig[], action: {type: string, payload: Record<string, any>}) {
  const { type, payload } = action;
  if(type === 'reset') {
    return infoModuleList
  }
  if(type === 'changeHidden') {
    return state.map(item => {
      if(item.key === payload.key) {
        return {
          ...item,
          hidden: !item.hidden
        }
      }
      return item;
    })
  }
  if(type === 'sort') {
    return arrayMove(state, payload.oldIndex, payload.newIndex)
  }
}

export default function EditResume() {
  const [moduleList, dispatch] = useReducer<(state: IInfoIconConfig[], action: Record<string, any>) => void, IInfoIconConfig[]>(reducer, infoModuleList)
  return (
    <>
      <div className="edit-cv-header">
        <Header />
      </div>
      <ThreeColumnLayout gap={20} className="edit-cv-container">
        <EditLeft data-width={"auto"}></EditLeft>
        <EditContent moduleList={moduleList} dispatch={dispatch} data-width="auto"></EditContent>
        <EditRight moduleList={moduleList} dispatch={dispatch} data-width={200}></EditRight>
      </ThreeColumnLayout>
    </>
  )
}