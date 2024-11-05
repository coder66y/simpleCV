import { Slider, SliderSingleProps } from "antd"
import './index.less'

export interface SliderWithValueProps extends SliderSingleProps {
  prefix?: string;
  showValue?: boolean;
  suffix?: string;
  valueSuffix?: string;
}

export const SliderWithValue = (props: SliderWithValueProps) => {
  const { prefix, suffix, showValue = true, valueSuffix, ...other } = props;

  const renderSlider = <div className="slider-with-value">
    <Slider {...other} className="slider"/>
    {showValue && <span className="slider-tips">{props.value}</span>}
    {valueSuffix && <span className="slider-tips">{valueSuffix}</span>}
  </div>

  if(prefix || suffix) {
    return <div className="slider-with-value-wrapper">
    {prefix && <div className="prefix">{prefix}</div>}
    {renderSlider}
    {suffix && <div className="suffix">{suffix}</div>}
  </div>
  } else {
    return renderSlider
  }
}