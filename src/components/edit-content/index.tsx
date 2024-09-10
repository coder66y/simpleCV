import { IInfoIconConfig, infoModuleList } from '@/pages/edit-resume/config';
import './index.less';
import { DispatchWithoutAction } from 'react';
const rootCls = 'edit-resume'
export interface IEditContentProps {
  moduleList: IInfoIconConfig[];
  dispatch: DispatchWithoutAction;
}
export default function EditContent(props: IEditContentProps) {
  const { moduleList, dispatch  } = props;
  return (
    <div className={`${rootCls}`}>
      {
        moduleList?.map(item => {
          return <div>{
            item.hidden ? null : item.title
            }</div>
        })
      }
    </div>
  )
}