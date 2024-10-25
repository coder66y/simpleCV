import { EDIT_RESUME_NAME_SPACE, IEditResumeModel } from '@/models/edit-resume'
import { useDebounceFn } from 'ahooks';
import { Checkbox, Col, Form, Input, Row, Select, Space } from 'antd';
import React from 'react'
import ImgReader from '@/components/img-reader';
import { connect } from 'dva'
import { genderOptions, maritalStatusOptions, politicalOptions, workAgeOptions } from './config';

export interface IBaseInfoSetFormProps {
  baseInfo?: IEditResumeModel['baseInfo'];
  dispatch?: React.Dispatch<any>
}

type BaseInfoSetFormValues = IEditResumeModel['baseInfo'];
export const BaseInfoSetForm = (props: IBaseInfoSetFormProps) => {
  const { baseInfo, dispatch } = props;
  const [form] = Form.useForm<BaseInfoSetFormValues>();
  const initValues = baseInfo;
  const gutter = 40, colSpan1 = 9, colSpan2 = 6;

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
      layout="vertical"
      className="base-info-set-form"
      initialValues={initValues}
      onValuesChange={() => {
        run()
      }}
    >
      <Row gutter={gutter}>
        <Col span={18}>
          <Row gutter={gutter}>
            <Col span={12}>
              <Form.Item name="name" label="姓名">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="gender" label="性别">
                <Select options={genderOptions} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={gutter}>
            <Col span={12}>
              <Form.Item name="age" label="年龄">
                <Input></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="联系电话">
                <Input></Input>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={colSpan2}>
        <div className='photo-wrapper'>
          <Form.Item name="photo" label="头像">
              <ImgReader  width={90}/>
            </Form.Item>
            <Form.Item name="photoShow" className='photo-show-checkbox'>
              <Checkbox>显示头像</Checkbox>
            </Form.Item>
        </div>
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={colSpan1}>
          <Form.Item name="email" label="邮箱">
            <Input></Input>
          </Form.Item>
        </Col>
        <Col span={colSpan1}>
          <Form.Item name="workAge" label="工作年限">
            <Select options={workAgeOptions}/>
          </Form.Item>
        </Col>
        <Col span={colSpan2}>
          <Form.Item name="maritalStatus" label="婚姻状况">
            <Select options={maritalStatusOptions}/>
          </Form.Item>
        </Col> 
      </Row>
      <Row gutter={gutter}>
        <Col span={colSpan1}>
        <Space>
          <Form.Item name="height" label="身高">
            <Input type="number" suffix="cm" />
          </Form.Item>
          <Form.Item name="weight" label="体重">
            <Input type="number" suffix="kg" />
          </Form.Item>
        </Space>
        </Col>
        <Col span={colSpan1}>
          <Form.Item name="nationality" label="民族">
            <Input/>
          </Form.Item>
        </Col>
        <Col span={colSpan2}>
          <Form.Item name="nativePlace" label="工作城市">
            <Input/>
          </Form.Item>
        </Col> 
      </Row>
      <Row gutter={gutter}>
        <Col span={colSpan1}>
          <Form.Item name="political" label="政治面貌">
            <Select options={politicalOptions}/>
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