import { EDIT_RESUME_NAME_SPACE, IEditResumeModel, IEducationInfoValues } from "@/models/edit-resume";
import { useDebounceFn } from "ahooks";
import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select, Space } from "antd"
import { connect } from "dva";
import { degreeOptions } from "./config";
import QuillEditor from "@/components/quill-editor";
import dayjs from "@/components/extend-dayjs";
import type { Dayjs } from 'dayjs';
import { ContentConfigKeyEnum } from "../../config";

export interface IEducationSetFormProps {
  educationInfo?: IEditResumeModel['education'];
  dispatch: React.Dispatch<any>;
}
export interface IEducationSetBaseFormProps {
  initValues?: IEducationInfoValues;
  onChange?: (values: IEducationInfoValues, index: number) => void;
  index: number;
}
export type IEducationSetFormValues = Record<number, IEducationInfoValues>;
export interface IEducationSetBseFormValues extends Omit<IEducationInfoValues, 'start' | 'end'> {
  start?: Dayjs;
  end?: Dayjs;
};
const format = 'YYYY-MM-DD'
const emptyData = {
  content: '',
  degree: '',
  end: '',
  major: '',
  name: '',
  start: '',
  today: false
}

/** 教育经理基础表单 */
function EducationSetBaseForm(props: IEducationSetBaseFormProps) {
  const { initValues, onChange, index } = props;
  const [form] = Form.useForm<IEducationSetBseFormValues>();
  const colSpan1 = 14, colSpan2 = 10,gutter = 40;
  const initialValues = {
    ...initValues,
    start: dayjs(initValues?.start),
    end: dayjs(initValues?.end)
  }

  const { run: onSave } = useDebounceFn(() => {
    const values = form.getFieldsValue()
    onChange?.({
      ...values,
      start: dayjs(values?.start).format(format),
      end: dayjs(values?.end).format(format)
    }, index)
  }, { wait: 500 })

  return (
    <Form
      form={form}
      className="education-base-set-form"
      layout="horizontal"
      initialValues={initialValues}
      onValuesChange={() => {
        onSave()
      }}
    >
      <Row gutter={gutter}>
        <Col span={colSpan1}>
          <Form.Item name="name" label="学校名称">
            <Input />
          </Form.Item>
        </Col>
        <Col span={colSpan2}>
          <Form.Item name="major" label="专业">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={colSpan1}>
          <Space>
            <Form.Item name="start" label="起止时间">
              <DatePicker />
            </Form.Item>
            <Form.Item name="end">
              <DatePicker />
            </Form.Item>
            <Form.Item name="today" valuePropName="checked">
              <Checkbox>至今</Checkbox>
            </Form.Item>
          </Space>
        </Col>
        <Col span={colSpan2}>
          <Form.Item name="degree" label="学历">
            <Select options={degreeOptions}/>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={24}>
          <Form.Item name="content" layout="vertical" label="学业/专业描述：">
            <QuillEditor />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
}

function EducationSetForm(props: IEducationSetFormProps) {
  const { dispatch, educationInfo = [] } = props;
  const handleChange = (values: IEducationInfoValues, index?:number) => {
    let newValues = educationInfo
    if(!index) {
      newValues = [
        ...educationInfo,
        values,
      ]
    } else {
      newValues = educationInfo?.map((item, idx) => {
        if(index === idx) {
          return {
            ...item,
            ...values
          }
        }
        return item
      })
    }
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.EDUCATION,
        value: newValues
      }
    })
  }

  const onAdd = () => {
    handleChange(emptyData)
  }
  return <div className="education-base-set-form-wrapper">
    {
      educationInfo?.map?.((item, index) => {
        return <EducationSetBaseForm
          key={`${item.name}-${item.start}-${item.end}-${item.major}=${index}`}
          onChange={handleChange}
          initValues={item}
          index={index}
        />
      })
    }
    <Button className="add-btn" onClick={onAdd}>新增教育经历</Button>
  </div>
}
export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    educationInfo: editResume.education
  }
})(EducationSetForm)