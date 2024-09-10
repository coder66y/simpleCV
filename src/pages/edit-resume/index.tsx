import EditContent from "@/components/edit-content";
import EditLeft from "@/components/edit-left";
import EditRight from "@/components/edit-right";
import ThreeColumnLayout from "@/layouts/three-column-layout";
import 'normalize.css'
import './index.less'
import { useReducer } from "react";
import { IInfoIconConfig, infoModuleList } from "./config";
import { arrayMove } from "@dnd-kit/sortable";

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
  console.info(`%c info 123: %o`, 'color: green; font-size: 20px; font-weight: 700', 123)
  return (
    <>
      <div className="edit-cv-header">
        <div className="edit-title">编辑简历</div>
      </div>
      <ThreeColumnLayout gap={20} className="edit-cv-container">
        <EditLeft data-width={"auto"}></EditLeft>
        <EditContent moduleList={moduleList} dispatch={dispatch} data-width="auto"></EditContent>
        <EditRight moduleList={moduleList} dispatch={dispatch} data-width={200}></EditRight>
      </ThreeColumnLayout>
    </>
  )
}