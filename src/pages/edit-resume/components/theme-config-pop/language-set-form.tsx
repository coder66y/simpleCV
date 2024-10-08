import { Form, Select } from "antd";
import { ILanguageSetFormValues } from "./type";
import { useTheme, useThemeDispatch } from "../../store/theme-context";


const fontOptions = [
  { label: '楷体', value: 'STKaiti, STKaiSC, STKaiTC, STKai-TC-Bold, Microsoft YaHei' },
  { label: '黑体', value: 'STHeiti, STHeitiSC, Microsoft YaHei' },
  { label: '微软雅黑', value: 'Microsoft YaHei' },
  { label: '华文仿宋', value: 'STFangsong, Microsoft YaHei' },
  { label: '报隶', value: 'STBaoliSC, STBaoliTC, Microsoft YaHei' },
  { label: '隶变', value: 'STLibianSC, STLibianTC, Microsoft YaHei' },
  { label: 'Times New Roman',value: 'Times New Roman, Microsoft YaHei' },
]

const languageOptions = [
  { label: '简体中文', value: 'zh-CN' },
  { label: 'English', value: 'en-US' },
]

const fontSizeOptions = [
  { label: '12', value: 12 },
  { label: '13', value: 13 },
  { label: '14', value: 14 },
  { label: '15', value: 15 },
  { label: '16', value: 16 },
]


export function LanguageSetForm() {
  const theme = useTheme();
  const dispatch = useThemeDispatch();
  const [form] = Form.useForm<ILanguageSetFormValues>()
  const initValues = {
    language: theme.language,
    fontFamily: theme.fontFamily,
    fontSize: theme.fontSize
  }
  return (
    <Form form={form} layout="horizontal" labelCol={{span: 6}} initialValues={initValues} className="language-set-form" onValuesChange={(changeValues: ILanguageSetFormValues) => {
      const key = Object.keys(changeValues) as (keyof ILanguageSetFormValues)[]
      dispatch?.({
        type: 'changeThemeKey',
        payload: {
          key: key[0],
          value: changeValues?.[key[0]],
        }
      })
    }}>
      <Form.Item name="fontFamily" label="字体">
        <Select options={fontOptions} style={{width: "180px"}} />
      </Form.Item>
      <Form.Item name="language" label="语言">
        <Select options={languageOptions} style={{width: "100px"}}/>
      </Form.Item>
      <Form.Item name="fontSize" label="字体大小">
        <Select options={fontSizeOptions} style={{width: "60px"}}/>
      </Form.Item>
    </Form>
  )
}

