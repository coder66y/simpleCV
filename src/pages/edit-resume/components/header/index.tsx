/*
 * @Description: 简历编辑页面头部
 * @Author: luyi.lss
 * @Date: 2024-09-13 00:07:08
 * @LastEditors: luyi
 * @LastEditTime: 2025-01-03 00:02:49
 */
import { Button, Space, Tooltip } from "antd";
import './index.less';
import ThreeColumnLayout from "@/components/three-column-layout";
import { _html2Canvas, exportPdf } from "@/utils/convert-pdf";
import { connect } from "dva";
import { IEditResumeModel } from "@/models/edit-resume";
import { useState } from "react";
function Header(props: {
  className?: string;
  baseInfo: IEditResumeModel['baseInfo'];
}) {
  const { className, baseInfo } = props;
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
      const filename = `${baseInfo?.name ?? '姓名'}-${baseInfo?.post ?? '意向岗位'}-${baseInfo?.phone ?? '联系电话'}`
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
    const filename = `${baseInfo?.name ?? '姓名'}-${baseInfo?.post ?? '意向岗位'}-${baseInfo?.phone ?? '联系电话'}`
    const $ele = document.getElementById('resumeContent') as HTMLElement;
    exportPdf($ele, filename, () => {
      setDownloadLoading(false)
    })
  }

  const onJumpEnter = () => {
    const jumpUrl = 'https://github.com/coder66y/simpleCV'
    window.open(jumpUrl, '_blank')
  }
  
  return (
    <ThreeColumnLayout gap={20} className={`edit-cv-title ${className}`}>
      <div data-width="auto" className="logo">
        <div className="gradient-color">编辑你自己的简历</div>
      </div>
      <div data-width={700}></div>
      <Space>
        <Button type="primary" onClick={onPrint} loading={printLoading}>打印</Button>
        <Button type="primary" ghost onClick={onDownloadImg}>下载图片</Button>
        <Button type="primary" ghost onClick={onDownloadPDF} loading={downloadLoading}>下载PDF</Button>
        <Tooltip title="">
          <i className="iconfont github-icon" onClick={onJumpEnter}>&#xe673;</i>
        </Tooltip>
      </Space>
    </ThreeColumnLayout>
  )
}

export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    baseInfo: editResume.baseInfo
  }
})(Header)