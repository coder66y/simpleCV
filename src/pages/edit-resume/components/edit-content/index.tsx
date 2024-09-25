/*
 * @Description: 简历内容主体
 * @Author: luyi.lss
 * @Date: 2024-08-23 14:51:41
 * @LastEditors: luyi.lss
 * @LastEditTime: 2024-09-25 09:51:19
 */
import './index.less';
import Editor from '@/components/quill-editor';
import { BulbFilled, CalendarFilled, EditFilled } from '@ant-design/icons';
import { useTheme } from '../../store/theme-context';
import { IInfoIconConfig, IModuleDataDispatchArgType } from '../../types';
const rootCls = 'edit-resume';
export interface IEditContentProps {
  moduleList: IInfoIconConfig[];
  dispatch: React.Dispatch<IModuleDataDispatchArgType>;
}
export default function EditContent(props: IEditContentProps) {
  const { moduleList, dispatch  } = props;
  const { color, pageMargin, moduleMargin } = useTheme()
  return (
    <div className={`${rootCls}`} style={{'--primaryColor': color, '--pageMargin': `${pageMargin}px`, '--moduleMargin': `${moduleMargin}px`}}>
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
            <div className='module-content-main'>
              <Editor readOnly={true} />
            </div>
          </div>
        })
      }
      </div>
    </div>
  )
}