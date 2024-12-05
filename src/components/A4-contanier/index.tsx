import { useEffect, useState } from "react"
import './index.less'
export interface A4ContainerProps {
  children: React.ReactNode
}
export default function A4Container(props: A4ContainerProps) {
  const { children } = props
  /** 暂存A4纸张高度 px */
  let A4Height = 1122;
  const [pageSize, setPageSize] = useState<number>(1)
  // 处理分页样式
  useEffect(() => {
    const $content = document.querySelector('.tpl-main')
    const $tplBox = document.querySelector('.tpl-box')
    const $A4Page = document?.querySelector('.tpl-page')
    // 获取设备A4高度的像素高
    A4Height = $A4Page?.getBoundingClientRect()?.height || 1122;
    const pageSize = Math.ceil(($content?.getBoundingClientRect()?.height || 1122) / A4Height);
    setPageSize(pageSize)
  }, [])

  return (
    <div className="tpl-box" style={{height: A4Height * pageSize}}>
      <div className='tpl-page'></div>
      <div className='tpl-main'>
        {children}
      </div>
      <ul className="page-line">
        {
          Array.from({ length: pageSize }).map((_, index) => (
            <li
              className="page-line-item"
              key={index} style={{
                position: "absolute",
                left: 0,
                top: (index + 1) * A4Height - 15
              }}>
                <span>分页区，请在内容里用换行避开此区域</span>
                <span>第{index + 1}页/共{pageSize}页</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}