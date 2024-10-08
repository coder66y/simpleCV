import { ColorPicker, ColorPickerProps, Form, theme as antdTheme } from "antd";
import { ISkinSetFormValues,  } from "./type";
import { generate, green, presetPalettes, red, grey } from '@ant-design/colors';
import { useTheme, useThemeDispatch } from "../../store/theme-context";
type Presets = Required<ColorPickerProps>['presets'][number];

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map<Presets>(([label, colors]) => ({ label, colors }));

export function SkinSetForm() {
  const theme = useTheme();
  const dispatch = useThemeDispatch();
  const [form] = Form.useForm<ISkinSetFormValues>()
  const initValues = {
    color: theme.color,
    secondaryColor: theme.secondaryColor
  }
  const { token } = antdTheme.useToken();
  const presets = genPresets({ primary: generate(token.colorPrimary), grey, red, green });
  return (
    <Form form={form} initialValues={initValues} className="skin-set-form" onValuesChange={(changeValues: ISkinSetFormValues) => {
      const key = Object.keys(changeValues) as (keyof ISkinSetFormValues)[]
      dispatch?.({
        type: 'changeThemeKey',
        payload: {
          key: key[0],
          value: changeValues?.[key[0]]?.toHexString(),
        }
      })
    }}>
      <Form.Item name="color" label="主要颜色">
        <ColorPicker presets={presets}/>
      </Form.Item>
      <Form.Item name="secondaryColor" label="次要颜色">
        <ColorPicker presets={presets}/>
      </Form.Item>
    </Form>
  )
}

