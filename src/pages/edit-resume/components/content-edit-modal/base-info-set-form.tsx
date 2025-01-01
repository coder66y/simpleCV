import { EDIT_RESUME_NAME_SPACE, IEditResumeModel } from '@/models/edit-resume'
import { useDebounceFn } from 'ahooks';
import { Checkbox, Col, DatePicker, Form, Input, Row, Select, Space } from 'antd';
import React from 'react'
import ImgReader from '@/components/img-reader';
import { connect } from 'dva'
import type { Dayjs } from 'dayjs';
import dayjs from '@/components/extend-dayjs';
import { genderOptions, maritalStatusOptions, politicalOptions, signInOptions, workAgeOptions } from '@/pages/edit-resume/config';
import ContentHeader from '@/components/content-header';
import { RuleObject } from 'antd/es/form';

export interface IBaseInfoSetFormProps {
  baseInfo?: IEditResumeModel['baseInfo'];
  dispatch?: React.Dispatch<any>
}

type BaseInfoSetFormValues = IEditResumeModel['baseInfo'] & {
  birthday: Dayjs;
}
export const BaseInfoSetForm = (props: IBaseInfoSetFormProps) => {
  const { baseInfo, dispatch } = props;
  const [form] = Form.useForm<BaseInfoSetFormValues>();
  const format = 'YYYY-MM-DD'
  const initValues = {
    ...baseInfo,
    birthday: dayjs(baseInfo?.birthday)
  };
  const gutter = 40, colSpan1 = 9, colSpan2 = 6, colSpan3 = 6;
  const commonRules = [
    {
      warningOnly: true,
      validator(rule: RuleObject, value: string) {
        if(!value) {
          return Promise.reject('建议必填')
        }
        return Promise.resolve();
      },
    }
  ]

  const { run } = useDebounceFn(async () => {
    const values = await form.validateFields();
    dispatch?.({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: 'baseInfo',
        value: {
          ...values,
          birthday: values?.birthday?.format(format)
        }
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
      <ContentHeader value="个人信息"/>
      <Row gutter={gutter}>
        <Col span={18}>
          <Row gutter={gutter}>
            <Col span={12}>
              <Form.Item name="name" label="姓名" rules={commonRules}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="gender" label="性别">
                <Select options={genderOptions} labelInValue/>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={gutter}>
            <Col span={12}>
              <Form.Item name="age" label="年龄" rules={commonRules}>
                <Input suffix="岁"></Input>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="phone" label="联系电话" rules={commonRules}>
                <Input></Input>
              </Form.Item>
            </Col>
          </Row>
        </Col>
        <Col span={colSpan2}>
        <div className='photo-wrapper'>
          <Form.Item name="photo" label="头像">
              <ImgReader width={90}/>
            </Form.Item>
            <Form.Item name="photoShow" valuePropName='checked' className='photo-show-checkbox'>
              <Checkbox>显示头像</Checkbox>
            </Form.Item>
        </div>
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={colSpan1}>
          <Form.Item name="birthday" label="出生日期">
            <DatePicker format={format} />
          </Form.Item>
        </Col>
        <Col span={colSpan1}>
          <Form.Item name="email" label="邮箱" rules={commonRules}>
            <Input></Input>
          </Form.Item>
        </Col>
        <Col span={colSpan2}>
          <Form.Item name="workAge" label="工作年限" rules={commonRules}>
            <Select options={workAgeOptions} labelInValue/>
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
          <Form.Item name="maritalStatus" label="婚姻状况">
            <Select options={maritalStatusOptions} labelInValue/>
          </Form.Item>
        </Col> 
        <Col span={colSpan2}>
          <Form.Item name="nativePlace" label="籍贯">
            <Input/>
          </Form.Item>
        </Col> 
      </Row>
      <Row gutter={gutter}>
        <Col span={colSpan1}>
          <Form.Item name="nationality" label="民族">
            <Input/>
          </Form.Item>
        </Col>
        <Col span={colSpan1}>
          <Form.Item name="political" label="政治面貌">
            <Select options={politicalOptions} labelInValue/>
          </Form.Item>
        </Col>
      </Row>
      <ContentHeader value="求职意向"/>
      <Row gutter={gutter}>
        <Col span={colSpan3}>
          <Form.Item name="post" label="求职岗位" rules={commonRules}>
            <Input/>
          </Form.Item>
        </Col>
        <Col span={colSpan3}>
          <Form.Item name="city" label="意向城市">
            <Input/>
          </Form.Item>
        </Col>
        <Col span={colSpan3}>
          <Form.Item name="joinTime" label="到岗时间">
            <Select options={signInOptions} labelInValue/>
          </Form.Item>
        </Col>
        <Col span={colSpan3}>
          <Form.Item name="salary" label="期望薪资">
            <Input/>
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