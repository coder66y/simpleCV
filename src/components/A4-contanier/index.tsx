import { useEffect, useRef, useState } from "react"
import './index.less'
export interface A4ContainerProps {
  children: React.ReactNode;
}
export default function A4Container(props: A4ContainerProps) {
  const { children } = props;
  /** 默认A4纸张的高度 */
  const defaultA4Height = 1122;
  const resumeRef = useRef(null)
  /** A4纸张高度 px */
  let A4Height = defaultA4Height;
  const [pageSize, setPageSize] = useState<number>(1)
  // 处理分页样式
  useEffect(() => {
    /** 简历主体 */
    const $content = document.querySelector('.tpl-main') as Element;
    // 获取设备A4高度的像素高
    const $A4Page = document?.querySelector('.tpl-page')
    A4Height = $A4Page?.getBoundingClientRect()?.height || defaultA4Height;
    // 监听简历主体高度变化
    const obsever = new ResizeObserver((entries) => {
      const contentRect = entries[0].contentRect;
      const newPageSize = Math.ceil((contentRect?.height || 1122) / A4Height);
      if(pageSize !== newPageSize) {
        setPageSize(newPageSize)
      }
    })
    $content && obsever.observe($content)
    // 清除监听
    return () => {
      $content && obsever.unobserve($content)
    }
  }, [])

  return (
    <div className="tpl-box" style={{height: A4Height * pageSize}}>
      <div className='tpl-page'></div>
      <div className='tpl-main' ref={resumeRef}>
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
                <span className="page-line-text">分页区，请在内容里用换行避开此区域</span>
                <span className="page-line-text">第{index + 1}页/共{pageSize}页</span>
            </li>
          ))
        }
      </ul>
    </div>
  )
}