/*
 * @Description: 简历编辑页面头部
 * @Author: luyi.lss
 * @Date: 2024-09-13 00:07:08
 * @LastEditors: luyi.lss
 * @LastEditTime: 2024-12-05 16:36:16
 */
import { Button, Space } from "antd";
import './index.less';
import ThreeColumnLayout from "@/components/three-column-layout";
import html2canvas from 'html2canvas'

export default function Header() {
  /** 下载图片 */
  const onDownloadImg = () => {
    const $ele = document.getElementById('resumeContent') as HTMLElement;
    $ele && html2canvas($ele).then(canvas => {
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = 'resume.png';
      link.click();
    })
  }

  /** 预览pdf */
  const onPreviewPdf = () => {
    
  }
  return (
    <ThreeColumnLayout gap={20} className="edit-cv-title">
      <div data-width="auto" className="logo">
        编辑你自己的简历
      </div>
      <div data-width={700}></div>
      <Space>
        <Button type="primary" onClick={onPreviewPdf}>预览PDF及打印</Button>
        <Button type="primary" onClick={onDownloadImg}>下载图片</Button>
        <Button type="primary" ghost >下载PDF</Button>
      </Space>
    </ThreeColumnLayout>
  )
}