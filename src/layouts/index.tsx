import { ConfigProvider } from 'antd';
import React from 'react';
import 'normalize.css'
import { Outlet } from 'umi';
import './index.less'
export const colorPrimary = '#44a6d7';
import locale from 'antd/locale/zh_CN';
dayjs.locale('zh-cn');
import 'dayjs/locale/zh-cn';
import dayjs from '@/components/extend-dayjs';

export default function Layout() {
  return (
    <ConfigProvider locale={locale} theme={{
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
