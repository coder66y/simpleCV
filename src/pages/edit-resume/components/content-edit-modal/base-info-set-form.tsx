import { EDIT_RESUME_NAME_SPACE, IEditResumeModel } from '@/models/edit-resume'
import { useDebounceFn } from 'ahooks';
import { Form, Input } from 'antd';
import React from 'react'
import { connect } from 'dva'

export interface IBaseInfoSetFormProps {
  baseInfo?: IEditResumeModel['baseInfo'];
  dispatch?: React.Dispatch<any>
}
type BaseInfoSetFormValues = IEditResumeModel['baseInfo'];
export const BaseInfoSetForm = (props: IBaseInfoSetFormProps) => {
  const { baseInfo, dispatch } = props;
  const [form] = Form.useForm<BaseInfoSetFormValues>();
  const initValues = baseInfo;

  const { run } = useDebounceFn(() => {
    const values = form.getFieldsValue()
    dispatch?.({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: 'baseInfo',
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

const mapStateToProps = ({editResume}: { editResume: IEditResumeModel}) => ({
  baseInfo: editResume.baseInfo
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BaseInfoSetForm)