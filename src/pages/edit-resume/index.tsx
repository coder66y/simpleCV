import React, { Suspense, lazy } from 'react';

import { ThemeProvider } from './store/theme-context';

import ResumeSkeleton from '@/components/skeleton';
import ThreeColumnLayout from '@/components/three-column-layout';
import './index.less';

// 懒加载组件
const Header = lazy(() => import('./components/header'));
const EditLeft = lazy(() => import('./components/edit-left'));
const EditContent = lazy(() => import('./components/edit-content'));
const EditRight = lazy(() => import('./components/edit-right'));
const ContentEditModal = lazy(() => import('./components/content-edit-modal'));

export default function EditResume() {
  return (
    <ThemeProvider>
      <div className="page-container">
        <Suspense fallback={<ResumeSkeleton />}>
          <Header className="edit-cv-header" />
          <ThreeColumnLayout gap={20} className="edit-cv-container">
            <EditLeft data-width={'fit-content'} />
            <EditContent data-width="auto" />
            <EditRight data-width={'auto'} />
          </ThreeColumnLayout>
          <ContentEditModal />
        </Suspense>
      </div>
    </ThemeProvider>
  );
}
