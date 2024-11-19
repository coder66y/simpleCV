import { ConfigProvider } from 'antd';
import React from 'react';
import 'normalize.css'
import { Outlet } from 'umi';
export const colorPrimary = '#44a6d7';
import locale from 'antd/locale/zh_CN';
import './index.less'
export default function Layout() {
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
    }}>
      <Outlet />
    </ConfigProvider>
  );
}
