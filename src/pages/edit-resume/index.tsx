import EditContent from "./components/edit-content";
import EditLeft from "./components/edit-left";
import EditRight from "./components/edit-right";
import ThreeColumnLayout from "@/components/three-column-layout";
import './index.less'
import Header from "./components/header";
import { ThemeProvider } from './store/theme-context';
import ContentEditModal from "./components/content-edit-modal";

export default function EditResume() {
  return (
    <ThemeProvider>
      <div className="edit-cv-header">
        <Header />
      </div>
      <ThreeColumnLayout gap={20} className="edit-cv-container">
        <EditLeft data-width={"auto"}></EditLeft>
        <EditContent data-width="auto"></EditContent>
        <EditRight data-width={200}></EditRight>
      </ThreeColumnLayout>
      <ContentEditModal />
    </ThemeProvider>
  )
}