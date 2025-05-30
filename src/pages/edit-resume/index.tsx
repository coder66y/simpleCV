import ContentEditModal from './components/content-edit-modal';
import EditContent from './components/edit-content';
import EditLeft from './components/edit-left';
import EditRight from './components/edit-right';
import Header from './components/header';
import { ThemeProvider } from './store/theme-context';

import ThreeColumnLayout from '@/components/three-column-layout';

import './index.less';

export default function EditResume() {
  return (
    <ThemeProvider>
      <div className="page-container">
        <Header className="edit-cv-header" />
        <ThreeColumnLayout gap={20} className="edit-cv-container">
          <EditLeft data-width={'fit-content'}></EditLeft>
          <EditContent data-width="auto"></EditContent>
          <EditRight data-width={'auto'}></EditRight>
        </ThreeColumnLayout>
        <ContentEditModal />
      </div>
    </ThemeProvider>
  );
}
