
import React, { ReactComponentElement, ReactElement, ReactNode } from 'react';
const rootCls = 'three-column-layout';
import './index.less'

export interface IThreeColumnLayoutProps {
  /**
   * @description 组件的子节点
   * @default 
   */
  children?: React.ReactElement[];
  className?: string;
  gap?: number;
}
export default function ThreeColumnLayout(props: IThreeColumnLayoutProps) {
  const { children, gap = 0, className } = props;

  const List = React.Children.map(children, (child) => {
    const width = child?.props?.['data-width'];
    return (
      <div className={`${rootCls}-item`} style={{ flexBasis: width }}>
        {child}
      </div>
    )
  }) 

  return (
    <div className={`${rootCls} ${className}`} style={{gap: gap}}>
      {List}
    </div>
  )
}