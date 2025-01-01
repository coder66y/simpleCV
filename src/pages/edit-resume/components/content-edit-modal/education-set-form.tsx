import { EDIT_RESUME_NAME_SPACE, IEditResumeModel, IEducationInfoValues } from "@/models/edit-resume";
import { useDebounceFn } from "ahooks";
import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select, Space } from "antd"
import { connect } from "dva";
import QuillEditor from "@/components/quill-editor";
import dayjs from "@/components/extend-dayjs";
import type { Dayjs } from 'dayjs';
import { ContentConfigKeyEnum, SortTypeEnum, degreeOptions } from "../../config";
import { useScrollIntoView } from "@/utils/use-scroll-into-view";

export interface IEducationSetFormProps {
  educationInfo?: IEditResumeModel['education'];
  dispatch: React.Dispatch<any>;
  infoModuleList?: IEditResumeModel['moduleList']
}
/** 教育经历表单属性 */
export interface IEducationSetBaseFormProps {
  initValues?: IEducationSetFormValues;
  onChange?: (values: IEducationSetFormValues, index: number) => void;
  index: number;
  length?: number;
  onSort?: (type: SortTypeEnum, index: number) => void
}

/** 教育信息表单初始值 */
export interface IEducationSetFormValues extends Omit<IEducationInfoValues, 'start' | 'end'> {
  start?: Dayjs;
  end?: Dayjs;
};
const format = 'YYYY-MM-DD'
const emptyData = {
  content: '',
  degree: {value: '', label: "不填"},
  end: dayjs(),
  major: '',
  name: '',
  start: dayjs(),
  today: false
}

/** 教育基础表单 */
const EducationSetBaseForm = (props: IEducationSetBaseFormProps) => {
  const { initValues, onChange, index, length = 0, onSort } = props;
  const [form] = Form.useForm<IEducationSetFormValues>();
  const colSpan1 = 14, colSpan2 = 10;

  const { run: onSave } = useDebounceFn(async () => {
    const values = await form.validateFields()
    onChange?.(values, index)
  }, { wait: 500 })
  const handleSort = (type: SortTypeEnum) => {
    onSort?.(type, index)
  }

  return (
    <div className={`common-list-base-set-form-wrapper`}>
    <Row justify="end">
      <Space>
        {
          index > 0 && <Button type="primary" id={index === length - 1 ? 'lastOne' : ''} ghost onClick={() => handleSort(SortTypeEnum.UP)}>
          上移
          <i className="iconfont">&#xe8f5;</i>
        </Button>
        }
        {
          length > 1 && index < length - 1 && <Button type="primary" ghost onClick={() => handleSort(SortTypeEnum.DOWN)}>
          下移
          <i className='iconfont'>&#xe8f6;</i>
        </Button>
        }
        {
          length > 1 && <Button type="primary" ghost onClick={() => handleSort(SortTypeEnum.DELETE)}>
          删除
          <i className='iconfont'>&#xe600;</i>
        </Button>
        }
      </Space>
    </Row>
    <Form
      form={form}
      className="common-list-base-set-form"
      initialValues={initValues}
      onValuesChange={() => {
        onSave()
      }}
    >
      <Row>
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
      <Row>
        <Col span={colSpan1}>
          <Space>
            <Form.Item name="start" label="起止时间" rules={[
              {
                validator(rule, value: Dayjs) {
                  const end = form.getFieldValue('end');
                  if (value) {
                    if (value.isAfter(end)) {
                      return Promise.reject('不能晚于结束时间');
                    } else {
                      return Promise.resolve();
                    }
                  } else {
                    return Promise.resolve();
                  }
                },
              }
            ]}>
              <DatePicker format={format}/>
            </Form.Item>
            <Form.Item name="end" rules={[
              {
                validator(rule, value: Dayjs) {
                  const start = form.getFieldValue('start');
                  if (value) {
                    if (value.isBefore(start)) {
                      return Promise.reject('不能早于开始时间');
                       
                    } else {
                      return Promise.resolve();
                    }
                  } else {
                    return Promise.resolve();
                  }
                },
              }
            ]}>
              <DatePicker format={format}/>
            </Form.Item>
            <Form.Item name="today" valuePropName="checked">
              <Checkbox>至今</Checkbox>
            </Form.Item>
          </Space>
        </Col>
        <Col span={colSpan2}>
          <Form.Item name="degree" label="学历">
            <Select options={degreeOptions} labelInValue/>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item name="content" layout="vertical" label="学业/专业描述：">
            <QuillEditor/>
          </Form.Item>
        </Col>
      </Row>
    </Form>
    </div>
  )
}

function EducationSetForm(props: IEducationSetFormProps) {
  const { dispatch, educationInfo = [], infoModuleList } = props;
  useScrollIntoView("lastOne", [educationInfo.length])
  const handleChange = (values: IEducationSetFormValues, index?:number) => {
    let newEducationInfo = []
    const newValues = {
      ...values,
      start: values?.start?.format(format),
      end: values?.end?.format(format)
    }
    if(Number(index ?? -1) >= 0) {
      newEducationInfo = educationInfo?.map((item, idx) => {
        if(index === idx) {
          return {
            ...item,
            ...newValues,
          }
        }
        return item
      })
    } else {
      newEducationInfo = [
        ...educationInfo,
        newValues,
      ]
    }
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.EDUCATION,
        value: newEducationInfo
      }
    })
  }
  const onAdd = () => {
    handleChange({
      ...emptyData,
      id: - Math.ceil(Math.random() * 10000),
    })
  }

  const onSort = (type: SortTypeEnum, index: number) => {
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/sortModuleFormValues`,
      payload: {
        key: ContentConfigKeyEnum.EDUCATION,
        type,
        index,
      }
    })
  }

  return <div className="common-list-set-form-wrapper">
    {
      educationInfo?.map?.((item, index) => {
        return <EducationSetBaseForm
          key={item.id}
          onChange={handleChange}
          length={educationInfo.length}
          onSort={onSort}
          initValues={{
            ...item,
            start: !!item?.start ? dayjs(item?.start) : undefined,
            end: !!item?.end ? dayjs(item?.end) : undefined
          }}
          index={index}
        />
      })
    }
     <Button type="primary" ghost className="add-btn" onClick={onAdd}>新增{
      infoModuleList?.find(item => item.key === ContentConfigKeyEnum.EDUCATION)?.title
    }</Button>
  </div>
}
export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    educationInfo: editResume.education,
    infoModuleList: editResume.moduleList
  }
})(EducationSetForm)