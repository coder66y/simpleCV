/*
 * @Description: 简历编辑页面左侧栏
 * @Author: luyi.lss
 * @Date: 2024-09-12 15:27:51
 * @LastEditors: luyi
 * @LastEditTime: 2025-05-30 15:19:57
 */
import ThemeConfigPop from '../theme-config-pop';

import { THEME_CONFIG, ThemeConfigKeyEnum } from '@/pages/edit-resume/config';
import './index.less';

const rootCls = 'edit-left';

export default function EditLeft() {
  return (
    <div className={`${rootCls}`}>
      {THEME_CONFIG.leftIcons.map(item => {
        return (
          <ThemeConfigPop
            key={item.key}
            type={item.type}
            title={item.title}
            configKey={item.key as ThemeConfigKeyEnum}
            className="left-item"
            placement="right"
            trigger="click"
          >
            <div className="left-item-icon">{item.icon}</div>
            <div className="left-item-title">{item.title}</div>
          </ThemeConfigPop>
        );
      })}
    </div>
  );
}
