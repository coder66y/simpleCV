import { Button, ConfigProvider } from 'antd';
import React from 'react';
import 'normalize.css'
import { Outlet } from 'umi';
import './index.less'

export default function Layout() {
  return (
    <ConfigProvider theme={{
      token: {
        colorPrimary: '#44a6d7',
      },
    }}>
      <Outlet />
    </ConfigProvider>
  );
}
