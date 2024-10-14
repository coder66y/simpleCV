import { EDIT_RESUME_NAME_SPACE, IEditResumeModel } from "@/models/edit-resume";
import { useDebounceFn } from "ahooks";
import { Form, Input } from "antd"
import { connect } from "dva";

export interface ICVHeaderSetFormProps {
  resumeInfo?: IEditResumeModel['resumeInfo'];
  dispatch?: React.Dispatch<any>;
}
export type ICVHeaderSetFormValues = IEditResumeModel['resumeInfo'];
function CVHeaderSetForm(props: ICVHeaderSetFormProps) {
  const { resumeInfo, dispatch } = props;
  const [form] = Form.useForm<ICVHeaderSetFormValues>();
  const initValues = resumeInfo;

  const { run } = useDebounceFn(() => {
    const values = form.getFieldsValue()
    dispatch?.({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: 'resumeInfo',
        value: values
      }
    })
  }, { wait: 500 })

  return (
    <Form
      form={form}
      className="cv-header-set-form"
      layout="horizontal"
      labelAlign="left"
      labelCol={{span: 6}}
      initialValues={initValues}
      onValuesChange={() => {
        run()
      }}
    >
      <Form.Item name="title" label="简历标题">
        <Input />
      </Form.Item>
      <Form.Item name="slogan" label="简历SLOGAN">
        <Input />
      </Form.Item>
    </Form>
  )
}
export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    resumeInfo: editResume.resumeInfo
  }
})(CVHeaderSetForm)