/*
 * @Description: 简历编辑页面头部
 * @Author: luyi.lss
 * @Date: 2024-09-13 00:07:08
 * @LastEditors: luyi.lss
 * @LastEditTime: 2024-12-05 23:09:02
 */
import { Button, Modal, Space } from "antd";
import './index.less';
import ThreeColumnLayout from "@/components/three-column-layout";
import { _html2Canvas, exportPdf } from "@/utils/convert-pdf";
import { connect } from "dva";
import { IEditResumeModel } from "@/models/edit-resume";
import { useState } from "react";
function Header(props: {
  baseInfo: IEditResumeModel['baseInfo'];
}) {
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false)
  const [printLoading, setPrintLoading] = useState<boolean>(false)
  /** 下载图片 */
  const onDownloadImg = async () => {
    const $ele = document.getElementById('resumeContent') as HTMLElement;
    if($ele) {
      const canvas = await _html2Canvas($ele)
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      const filename = `${props.baseInfo?.name ?? '姓名'}-${props.baseInfo?.post ?? '意向岗位'}-${props.baseInfo?.phone ?? '联系电话'}`
      link.download = `${filename}.png`;
      link.click();
    }
  }

  /** 预览 */
  const onPrint = async () => {
    setPrintLoading(true)
    const $ele = document.getElementById('resumeContent') as HTMLElement;
    exportPdf($ele, '', async (output) => {
      if(output) {
        const _url = URL.createObjectURL(output);
        window.open(_url, '_blank')
      }
      setPrintLoading(false)
    }, false)
  }
  
  /** 下载pdf */
  const onDownloadPDF = () => {
    setDownloadLoading(true)
    const filename = `${props.baseInfo?.name ?? '姓名'}-${props.baseInfo?.post ?? '意向岗位'}-${props.baseInfo?.phone ?? '联系电话'}`
    const $ele = document.getElementById('resumeContent') as HTMLElement;
    exportPdf($ele, filename, () => {
      setDownloadLoading(false)
    })
  }
  
  return (
    <ThreeColumnLayout gap={20} className="edit-cv-title">
      <div data-width="auto" className="logo">
        编辑你自己的简历
      </div>
      <div data-width={700}></div>
      <Space>
        <Button type="primary" onClick={onPrint} loading={printLoading}>打印</Button>
        <Button type="primary" ghost onClick={onDownloadImg}>下载图片</Button>
        <Button type="primary" ghost onClick={onDownloadPDF} loading={downloadLoading}>下载PDF</Button>
      </Space>
    </ThreeColumnLayout>
  )
}

export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    baseInfo: editResume.baseInfo
  }
})(Header)