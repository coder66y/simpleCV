/*
 * @Description: 简历编辑页面头部
 * @Author: luyi.lss
 * @Date: 2024-09-13 00:07:08
 * @LastEditors: luyi.lss
 * @LastEditTime: 2024-12-04 23:02:31
 */
import { Button, Space } from "antd";
import './index.less';
import ThreeColumnLayout from "@/components/three-column-layout";
import { useTheme } from "../../store/theme-context";

export default function Header() {
  const onDownLoad = () => {
    //根据div标签ID拿到div中的局部内容
    const bdhtml = window.document.body.innerHTML; 
    var printData = document.getElementById("ResumePage").innerHTML;
    //把获取的 局部div内容赋给body标签, 相当于重置了 body里的内容
    window.document.body.innerHTML= printData; 
    //调用打印功能
    window.print();
    window.document.body.innerHTML = bdhtml;//重新给页面内容赋值；
  }
  return (
      <ThreeColumnLayout gap={20} className="edit-cv-title">
        <div data-width="auto" className="logo">
          编辑你自己的简历
        </div>
        <div data-width={700}></div>
        <Space>
          <Button type="primary">预览PDF</Button>
          <Button type="primary">下载图片</Button>
          <Button type="primary" ghost onClick={onDownLoad} >下载PDF</Button>
        </Space>
      </ThreeColumnLayout>
  )
}