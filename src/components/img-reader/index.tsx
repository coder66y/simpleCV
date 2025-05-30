import { Input, message } from 'antd';
import { ChangeEvent } from 'react';

import styles from './index.less';
export const getBase64 = (img: File, callback: (url: string) => void) => {
  let reader: FileReader | undefined = new FileReader();
  reader.addEventListener('load', (e: ProgressEvent<FileReader>) => {
    if (e.loaded > 1024 * 1024 * 2) {
      message.error('图片大小不能超过2M');
      reader = undefined;
      return;
    }
    callback(reader?.result as string);
  });
  reader.readAsDataURL(img);
};

export interface ImgReaderProps {
  value?: string;
  width?: number;
  height?: number;
  onChange?: (base64Url: string) => void;
}

export default function ImgReader(props: ImgReaderProps) {
  const { value, width = 100, height, onChange } = props;
  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) {
      message.error('读取失败');
      return;
    }
    getBase64(file, (url: string) => {
      onChange?.(url);
    });
  };
  /** 组件高度 */
  const _height = height ? height : width * 1.4; // 1寸照片的比例
  /** 共同样式 */
  const commonStyle = { width: width + 'px', height: _height + 'px' };

  return (
    <div className={styles['img-reader-contanier']}>
      <Input
        rootClassName="img-input"
        accept=".jpg,.png,.jpeg"
        type="file"
        onChange={handleClick}
        style={commonStyle}
      ></Input>
      <img className="img-show" src={value} alt="图片" style={commonStyle} />
    </div>
  );
}
