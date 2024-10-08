import { Slider, SliderSingleProps } from "antd"
import './index.less'

export const SliderWithValue = (props: SliderSingleProps) => {
  return <div className="slider-with-value">
    <Slider {...props} className="slider"/>
    <span className="slider-tips">{props.value}</span>
  </div>
}