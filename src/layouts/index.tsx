import { ConfigProvider } from 'antd';
import React from 'react';
import 'normalize.css';
import { Outlet } from 'umi';
export const colorPrimary = '#44a6d7';
import locale from 'antd/locale/zh_CN';

import { performanceMonitor } from '@/utils/performance';

import './index.less';
export default function Layout() {
  // 记录性能指标
  performanceMonitor.logMetrics();
  return (
    <ConfigProvider
      locale={locale}
      theme={{
        token: {
          colorPrimary: colorPrimary,
        },
        components: {
          Slider: {
            trackBg: colorPrimary,
            trackHoverBg: colorPrimary,
          },
        },
      }}
    >
      <Outlet />
    </ConfigProvider>
  );
}
