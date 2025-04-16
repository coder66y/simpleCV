/*
 * @Description: 简历编辑页面头部
 * @Author: luyi.lss
 * @Date: 2024-09-13 00:07:08
 * @LastEditors: luyi
 * @LastEditTime: 2025-05-30 16:30:06
 */
import { Button, message, Space, Tooltip } from 'antd';
import './index.less';
import { connect } from 'dva';
import { useState } from 'react';

import { themeCacheKey, useThemeDispatch } from '../../store/theme-context';
import { IModuleDataDispatchArgType } from '../../types';

import ThreeColumnLayout from '@/components/three-column-layout';
import { cacheKey, EDIT_RESUME_NAME_SPACE, IEditResumeModel } from '@/models/edit-resume';
import { _html2Canvas, exportPdf } from '@/utils/convert-pdf';
import { getLocalStorage, simpleCVCacheKey } from '@/utils/local-storage';

function Header(props: {
  className?: string;
  baseInfo: IEditResumeModel['baseInfo'];
  dispatch: React.Dispatch<IModuleDataDispatchArgType>;
}) {
  const themeDispatch = useThemeDispatch();
  const { className, baseInfo, dispatch: contentDispatch } = props;
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const [printLoading, setPrintLoading] = useState<boolean>(false);
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [importLoading, setImportLoading] = useState<boolean>(false);
  /** 下载图片 */
  const onDownloadImg = async () => {
    const $ele = document.getElementById('resumeContent') as HTMLElement;
    if ($ele) {
      const canvas = await _html2Canvas($ele);
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = dataURL;
      const filename = `${baseInfo?.name ?? '姓名'}-${baseInfo?.post ?? '意向岗位'}-${baseInfo?.phone ?? '联系电话'}`;
      link.download = `${filename}.png`;
      link.click();
    }
  };

  /** 预览 */
  const onPrint = async () => {
    setPrintLoading(true);
    const $ele = document.getElementById('resumeContent') as HTMLElement;
    exportPdf(
      $ele,
      '',
      async output => {
        if (output) {
          const _url = URL.createObjectURL(output);
          window.open(_url, '_blank');
        }
        setPrintLoading(false);
      },
      false
    );
  };

  /** 下载pdf */
  const onDownloadPDF = async () => {
    setDownloadLoading(true);
    const filename = `${baseInfo?.name ?? '姓名'}-${baseInfo?.post ?? '意向岗位'}-${baseInfo?.phone ?? '联系电话'}`;
    const $ele = document.getElementById('resumeContent') as HTMLElement;
    exportPdf($ele, filename, () => {
      setDownloadLoading(false);
    });
  };

  const onJumpEnter = () => {
    const jumpUrl = 'https://github.com/coder66y/simpleCV';
    window.open(jumpUrl, '_blank');
  };

  const onExportJSON = () => {
    setExportLoading(true);
    const data = getLocalStorage(simpleCVCacheKey);
    if (!Object.keys(data).length) {
      message.error('无修改,不用导出json');
      return;
    }
    const jsonData = JSON.stringify(data, undefined, 4);
    const blob = new Blob([jsonData], { type: 'text/json' });
    const a = document.createElement('a');
    a.download = 'simpleCV.json';
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
    a.click();
    a.remove();
    setExportLoading(false);
  };

  const onImportJSON = () => {
    setImportLoading(true);
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = e => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) {
        message.error('读取失败');
        return;
      }
      const reader = new FileReader();
      reader.onload = e => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          try {
            const data = JSON.parse(result);
            themeDispatch?.({
              type: 'changeAllTheme',
              payload: data?.[themeCacheKey],
            });
            contentDispatch?.({
              type: `${EDIT_RESUME_NAME_SPACE}/changeAllModule`,
              payload: data?.[cacheKey],
            });
            message.success('导出成功');
          } catch (error) {
            message.error('导入失败');
          }
        }
      };
      reader.readAsText(file);
    };
    input.click();
    input.remove();
    setImportLoading(false);
  };

  return (
    <ThreeColumnLayout gap={20} className={`edit-cv-title ${className}`}>
      <div data-width="auto" className="logo">
        <strong className="gradient-color">编辑你自己的简历</strong>
      </div>
      <div data-width={700}></div>
      <Space>
        <Button type="primary" onClick={onPrint} loading={printLoading}>
          打印
        </Button>
        <Button type="primary" ghost onClick={onDownloadImg}>
          下载图片
        </Button>
        <Button type="primary" ghost onClick={onDownloadPDF} loading={downloadLoading}>
          下载PDF
        </Button>
        <Button type="primary" ghost onClick={onExportJSON} loading={exportLoading}>
          导出JSON
        </Button>
        <Button type="primary" ghost onClick={onImportJSON} loading={importLoading}>
          导入JSON
        </Button>
        <Tooltip title="">
          <i className="iconfont github-icon" onClick={onJumpEnter}>
            &#xe673;
          </i>
        </Tooltip>
      </Space>
    </ThreeColumnLayout>
  );
}

export default connect(({ editResume }: { editResume: IEditResumeModel }) => {
  return {
    baseInfo: editResume.baseInfo,
  };
})(Header);
