/*
 * @Description: 简历编辑页面左侧栏
 * @Author: luyi.lss
 * @Date: 2024-09-12 15:27:51
 * @LastEditors: luyi.lss
 * @LastEditTime: 2024-09-24 23:20:59
 */
import { leftIconConfig, ThemeConfigKeyEnum } from '@/pages/edit-resume/config'
import './index.less';
import { useThemeDispatch } from '../../store/theme-context';
import ThemeConfigPop from '../theme-config-pop';
import { useState } from 'react';

const rootCls = 'edit-left'
export interface IEditLeftProps {}
export default function EditLeft(props: IEditLeftProps) {
  const dispatch = useThemeDispatch();  
  return (
    <div className={`${rootCls}`}>
      {leftIconConfig.map(item => {
        return <ThemeConfigPop
          key={item.key}
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