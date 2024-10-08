import { Button, ConfigProvider } from 'antd';
import React from 'react';
import 'normalize.css'
import { Outlet } from 'umi';
import './index.less'
export const colorPrimary = '#44a6d7';

export default function Layout() {
  return (
    <ConfigProvider theme={{
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
