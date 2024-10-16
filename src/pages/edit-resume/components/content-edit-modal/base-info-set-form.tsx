import { EDIT_RESUME_NAME_SPACE, IEditResumeModel } from '@/models/edit-resume'
import { useDebounceFn } from 'ahooks';
import { Col, Form, Input, Row } from 'antd';
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
      className="base-info-set-form"
      initialValues={initValues}
      onValuesChange={() => {
        run()
      }}
    >
      <Row>
        <Col span={9}>
          <Form.Item name="name" label="姓名">
            <Input />
          </Form.Item>
        </Col>
        <Col span={9}>
          <Form.Item name="gender" label="性别">
            <Input />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="photo" label="头像">
            <Input />
          </Form.Item>
        </Col>
      </Row>

      
    </Form>
  )
}

const mapStateToProps = ({editResume}: { editResume: IEditResumeModel}) => ({
  baseInfo: editResume.baseInfo
})

export default connect(mapStateToProps)(BaseInfoSetForm)