import { EDIT_RESUME_NAME_SPACE, IEditResumeModel, IWorkExperienceValues } from "@/models/edit-resume";
import { useDebounceFn } from "ahooks";
import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Space } from "antd"
import { connect } from "dva";
import QuillEditor from "@/components/quill-editor";
import dayjs from "@/components/extend-dayjs";
import type { Dayjs } from 'dayjs';
import { ContentConfigKeyEnum, SortTypeEnum } from "../../config";
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from "@ant-design/icons";
import { useScrollIntoView } from "@/utils/use-scroll-into-view";

export interface IWorkExperienceSetFormProps {
  workExperience?: IEditResumeModel['workExperience'];
  dispatch: React.Dispatch<any>;
  infoModuleList?: IEditResumeModel['moduleList']
}
/** 表单属性 */
export interface IWorkExperienceBaseSetFormProps {
  initValues?: IWorkExperienceSetFormValues;
  onChange?: (values: IWorkExperienceSetFormValues, index: number) => void;
  index: number;
  length?: number;
  onSort?: (type: SortTypeEnum, index: number) => void
}

/** 表单初始值 */
export interface IWorkExperienceSetFormValues extends Omit<IWorkExperienceValues, 'start' | 'end'> {
  start?: Dayjs;
  end?: Dayjs;
};
const format = 'YYYY-MM-DD'
const emptyData = {
  content: '',
  end: dayjs(),
  job: '',
  name: '',
  start: dayjs(),
  today: false
}

/** 基础表单 */
function WorkExperienceBaseSetForm(props: IWorkExperienceBaseSetFormProps) {
  const { initValues, onChange, index, length = 0, onSort } = props;
  const [form] = Form.useForm<IWorkExperienceSetFormValues>();
  const colSpan1 = 14, colSpan2 = 10;

  const { run: onSave } = useDebounceFn(async () => {
    const values = await form.validateFields()
    onChange?.(values, index)
  }, { wait: 500 })

  const handleSort = (type: SortTypeEnum) => {
    onSort?.(type, index)
  }

  return (
    <div className="common-list-base-set-form-wrapper">
    <Row justify="end">
      <Space>
        {
          index > 0 && <Button type="primary" id={index === length - 1 ? 'lastOne' : ''} ghost onClick={() => handleSort(SortTypeEnum.UP)}>
          上移
          <ArrowUpOutlined />
        </Button>
        }
        {
          length > 1 && index < length - 1 && <Button type="primary" ghost onClick={() => handleSort(SortTypeEnum.DOWN)}>
          下移
          <ArrowDownOutlined />
        </Button>
        }
        {
          length > 1 && <Button type="primary" ghost onClick={() => handleSort(SortTypeEnum.DELETE)}>
          删除
          <DeleteOutlined />
        </Button>
        }
      </Space>
    </Row>
    <Form
      form={form}
      className="common-list-base-set-form"
      layout="horizontal"
      initialValues={initValues}
      onValuesChange={() => {
        onSave()
      }}
    >
      <Row>
        <Col span={colSpan1}>
          <Form.Item name="name" label="公司名称">
            <Input />
          </Form.Item>
        </Col>
        <Col span={colSpan2}>
          <Form.Item name="job" label="职位">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={colSpan1}>
          <Space>
            <Form.Item name="start" label="在职时间" rules={[
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
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item name="content" layout="vertical" label="工作内容：">
            <QuillEditor />
          </Form.Item>
        </Col>
      </Row>
    </Form>
    </div>
  )
}

function WorkExperienceSetForm(props: IWorkExperienceSetFormProps) {
  const { dispatch, workExperience = [], infoModuleList } = props;
  useScrollIntoView("lastOne", [workExperience.length])

  const handleChange = (values: IWorkExperienceSetFormValues, index?:number) => {
    let newList = []
    const newValues = {
      ...values,
      start: values?.start?.format(format),
      end: values?.end?.format(format)
    }
    if(Number(index ?? -1) >= 0) {
      newList = workExperience?.map((item, idx) => {
        if(index === idx) {
          return {
            ...item,
            ...newValues,
          }
        }
        return item
      })
    } else {
      newList = [
        ...workExperience,
        newValues,
      ]
    }
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.WORK_EXPERIENCE,
        value: newList
      }
    })
  }

  const onAdd = () => {
    handleChange(emptyData)
  }
  const onSort = (type: SortTypeEnum, index: number) => {
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/sortModuleFormValues`,
      payload: {
        key: ContentConfigKeyEnum.WORK_EXPERIENCE,
        type,
        index,
      }
    })
  }

  return <div className="common-list-set-form-wrapper">
    {
      workExperience?.map?.((item, index) => {
        return <WorkExperienceBaseSetForm
          key={`${item.name}-${item.start}-${item.end}-${item.job}-${item.content}-${index}`}
          onChange={(values: IWorkExperienceSetFormValues) => {
            handleChange(values, index)
          }}
          length={workExperience.length}
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
    <Button className="add-btn" onClick={onAdd}>新增{
      infoModuleList?.find(item => item.key === ContentConfigKeyEnum.WORK_EXPERIENCE)?.title
    }</Button>
  </div>
}
export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    workExperience: editResume.workExperience,
    infoModuleList: editResume.moduleList
  }
})(WorkExperienceSetForm)