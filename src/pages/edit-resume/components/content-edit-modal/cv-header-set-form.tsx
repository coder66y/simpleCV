import { Form } from "antd"

export interface ICVHeaderSetFormValues {

}
function CVHeaderSetForm() {
  const [form] = Form.useForm<ICVHeaderSetFormValues>();
  const initValues = {};
  return (
    <Form form={form} layout="horizontal" labelCol={{span: 6}} initialValues={initValues} className="language-set-form" onValuesChange={(changeValues: ICVHeaderSetFormValues) => {}}>
      <Form.Item name="fontFamily" label="字体">
        
      </Form.Item>
    </Form>
  )
}
export default CVHeaderSetForm