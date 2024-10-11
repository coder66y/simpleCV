import { Form, Input } from "antd"

export interface ICVHeaderSetFormValues {

}
function CVHeaderSetForm() {
  const [form] = Form.useForm<ICVHeaderSetFormValues>();
  const initValues = {

  };
  return (
    <Form
      form={form}
      className="cv-header-set-form"
      layout="horizontal"
      labelAlign="left"
      labelCol={{span: 6}}
      initialValues={initValues}
      onValuesChange={(changeValues: ICVHeaderSetFormValues) => {

      }}
    >
      <Form.Item name="CVtitle" label="简历标题">
        <Input />
      </Form.Item>
      <Form.Item name="slogan" label="简历SLOGAN">
        <Input />
      </Form.Item>
    </Form>
  )
}
export default CVHeaderSetForm