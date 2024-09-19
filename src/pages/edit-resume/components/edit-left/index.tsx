import { leftIconConfig } from '@/pages/edit-resume/config'
import style from './index.less';
import { Popover } from 'antd';

const rootCls = 'edit-left'
export interface IEditLeftProps {

}

export default function EditLeft(props: IEditLeftProps) {
  return (
    <div className={`${style['edit-left']}`}>
      {leftIconConfig.map(item => {
        return <div className="left-item" key={item.key}>
          <div className='left-item-icon'>{item.icon}</div>
          <div className='left-item-title'>{item.title}</div>
        </div>
      })}
    </div>
  )
}