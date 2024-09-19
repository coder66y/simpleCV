import { Button, ConfigProvider } from 'antd';
import React from 'react';
import { Outlet } from 'umi';

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
