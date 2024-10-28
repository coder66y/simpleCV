import { EDIT_RESUME_NAME_SPACE, IEditResumeModel } from "@/models/edit-resume";
import { useDebounceFn } from "ahooks";
import { Form, Input } from "antd"
import { connect } from "dva";

export interface IEducationSetFormProps {
  educationInfo?: IEditResumeModel['educationInfo'];
  dispatch?: React.Dispatch<any>;
}
export type ICVHeaderSetFormValues = IEditResumeModel['educationInfo'];
function EducationSetForm(props: IEducationSetFormProps) {
  const { educationInfo, dispatch } = props;
  const [form] = Form.useForm<ICVHeaderSetFormValues>();
  const initValues = educationInfo;

  const { run } = useDebounceFn(() => {
    const values = form.getFieldsValue()
    dispatch?.({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: 'educationInfo',
        value: values
      }
    })
  }, { wait: 500 })

  return (
    <Form
      form={form}
      className="cv-header-set-form"
      layout="horizontal"
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
    educationInfo: editResume.educationInfo
  }
})(EducationSetForm)