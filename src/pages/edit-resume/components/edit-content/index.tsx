import { IInfoIconConfig } from '@/pages/edit-resume/config';
import './index.less';
import { DispatchWithoutAction } from 'react';
import Editor from '@/components/quill-editor';
import { BulbFilled, CalendarFilled, EditFilled } from '@ant-design/icons';
import { useTheme } from '../../store/theme-context';
const rootCls = 'edit-resume';
export interface IEditContentProps {
  moduleList: IInfoIconConfig[];
  dispatch: DispatchWithoutAction;
}
export default function EditContent(props: IEditContentProps) {
  const { moduleList, dispatch  } = props;
  const { color, pageMargin } = useTheme()
  return (
    <div className={`${rootCls}`} style={{'--primaryColor': color, '--pageMargin': pageMargin}}>
      <div className={`${rootCls}-header`} style={{color}}>
        <dl className="left-box" >
          <dt className="resume-title" style={{borderRightColor: color}}>
            个人简历
          </dt>
          <dd>
            <p>
              求职意向：前端工程师
            </p> Personal resume
          </dd>
        </dl>
        <div className='right-box'>
          <BulbFilled />
          <CalendarFilled />
          <EditFilled />
        </div>
      </div>
      <div className={`${rootCls}-line-box`}>
        <div className='line-left' style={{backgroundColor: color}}>
          <i style={{borderLeftColor: color}}></i>
        </div>
        <div className='line-right'>
          <i></i>
        </div>
      </div>
      <div className={`${rootCls}-content`}>
      {
        moduleList?.map(item => {
          return item.hidden ? null : <div className={`${rootCls}-info-module`}>
            <div className='module-title' style={{backgroundColor: color}}>
              <span className='title-text'>{item.title}</span>
              <div className='title-icon'>
                <i></i>
              </div>
              <dfn></dfn>
            </div>
            <div className='module-line'>
            </div>
            <div>
              <Editor readOnly={true} />
            </div>
          </div>
        })
      }
      </div>
    </div>
  )
}