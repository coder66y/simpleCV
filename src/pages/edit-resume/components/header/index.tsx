import { Button, Space } from "antd";
import './index.less';
import ThreeColumnLayout from "@/components/three-column-layout";
import { useTheme } from "../../store/theme-context";

export default function Header() {
  const theme = useTheme()
  return (
      <ThreeColumnLayout gap={20} className="edit-cv-title">
        <div data-width="auto" className="logo">
          编辑你自己的简历
        </div>
        <div data-width={700}></div>
        <Space>
          <Button type="primary">下载图片</Button>
          <Button type="primary" ghost>下载PDF</Button>
        </Space>
      </ThreeColumnLayout>
  )
}