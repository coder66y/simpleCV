/*
 * @Description: 简历编辑页面左侧栏
 * @Author: luyi.lss
 * @Date: 2024-09-12 15:27:51
 * @LastEditors: luyi
 * @LastEditTime: 2024-12-13 14:41:48
 */
import { leftIconConfig, ThemeConfigKeyEnum } from '@/pages/edit-resume/config'
import './index.less';
import ThemeConfigPop from '../theme-config-pop';

const rootCls = 'edit-left'
export interface IEditLeftProps {}
export default function EditLeft(props: IEditLeftProps) {
  return (
    <div className={`${rootCls}`}>
      {leftIconConfig.map(item => {
        return <ThemeConfigPop
          key={item.key}
          type={item.type}
          title={item.title}
          configKey={item.key as ThemeConfigKeyEnum}
          className='left-item'
          placement='right'
          trigger='click'
        >
          <div className='left-item-icon'>{item.icon}</div>
          <div className='left-item-title'>{item.title}</div>
        </ThemeConfigPop>
      })}
    </div>
  )
}