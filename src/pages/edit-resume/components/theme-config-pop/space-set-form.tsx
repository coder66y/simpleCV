import { Form } from "antd";
import { ISpaceSetFormValues } from "./type";
import { useTheme, useThemeDispatch } from "../../store/theme-context";
import { SliderWithValue } from "@/components/slider-with-value";

export function SpaceSetForm() {
  const theme = useTheme();
  const dispatch = useThemeDispatch();
  const [form] = Form.useForm<ISpaceSetFormValues>()
  const initValues = {
    pageMargin: theme.pageMargin,
    lineHeight: theme.lineHight,
    moduleMargin: theme.moduleMargin
  }
  return (
    <Form form={form} labelCol={{span: 6}} initialValues={initValues} className="space-set-form" onValuesChange={(changeValues: ISpaceSetFormValues) => {
      const key = Object.keys(changeValues) as (keyof ISpaceSetFormValues)[]
      dispatch?.({
        type: 'changeThemeKey',
        payload: {
          key: key[0],
          value: changeValues?.[key[0]],
        }
      })
    }}>
      <Form.Item label="页面边距" name="pageMargin" >
        <SliderWithValue min={20} max={50} step={1}/>
      </Form.Item>
      <Form.Item label="行高" name="lineHeight">
        <SliderWithValue min={0.3} max={1.2} step={0.1}/>
      </Form.Item>
      <Form.Item label="模块边距" name="moduleMargin">
        <SliderWithValue min={5} max={30} step={1}/>
      </Form.Item>
    </Form>
  )
}

