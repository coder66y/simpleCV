import { IInfoIconConfig } from '@/pages/edit-resume/config';
import './index.less';
import { DispatchWithoutAction, useRef } from 'react';
import Editor from '@/components/editor';
const rootCls = 'edit-resume'
export interface IEditContentProps {
  moduleList: IInfoIconConfig[];
  dispatch: DispatchWithoutAction;
}
export default function EditContent(props: IEditContentProps) {
  const { moduleList, dispatch  } = props;
  const editRef = useRef(null)
  return (
    <div className={`${rootCls}`} data-id="edit-content">
      {
        moduleList?.map(item => {
          return <div className='resume-content-main'>
            <div className='module-title'>
              {item.hidden ? null : item.title}
            </div>
            <div className='module-line'>
            </div>
            <div>
              <Editor ref={editRef}/>
            </div>
          </div>
        })
      }
    </div>
  )
}