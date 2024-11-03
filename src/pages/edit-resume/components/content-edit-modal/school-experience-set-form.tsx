import { EDIT_RESUME_NAME_SPACE, IEditResumeModel, ISchoolExperienceValues } from "@/models/edit-resume";
import { useDebounceFn } from "ahooks";
import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Space } from "antd"
import { connect } from "dva";
import QuillEditor from "@/components/quill-editor";
import dayjs from "@/components/extend-dayjs";
import type { Dayjs } from 'dayjs';
import { ContentConfigKeyEnum, SortTypeEnum } from "../../config";
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from "@ant-design/icons";

export interface ISchoolExperienceSetFormProps {
  schoolExperience?: IEditResumeModel['schoolExperience'];
  dispatch: React.Dispatch<any>;
  infoModuleList?: IEditResumeModel['moduleList']
}
/** 表单属性 */
export interface ISchoolExperienceBaseSetFormProps {
  initValues?: ISchoolExperienceSetFormValues;
  onChange?: (values: ISchoolExperienceSetFormValues, index: number) => void;
  index: number;
  length?: number;
  onSort?: (type: SortTypeEnum, index: number) => void
}

/** 表单初始值 */
export interface ISchoolExperienceSetFormValues extends Omit<ISchoolExperienceValues, 'start' | 'end'> {
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
function SchoolExperienceBaseSetForm(props: ISchoolExperienceBaseSetFormProps) {
  const { initValues, onChange, index, length = 0, onSort } = props;
  const [form] = Form.useForm<ISchoolExperienceSetFormValues>();
  const colSpan1 = 14, colSpan2 = 10,gutter = 40;

  const { run: onSave } = useDebounceFn(() => {
    const values = form.getFieldsValue()
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
          index > 0 && <Button type="primary" ghost onClick={() => handleSort(SortTypeEnum.UP)}>
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
      <Row gutter={gutter}>
        <Col span={colSpan1}>
          <Form.Item name="name" label="经历名称">
            <Input />
          </Form.Item>
        </Col>
        <Col span={colSpan2}>
          <Form.Item name="job" label="角色">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={colSpan1}>
          <Space>
            <Form.Item name="start" label="时间">
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
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={24}>
          <Form.Item name="content" layout="vertical" label="经历描述：">
            <QuillEditor />
          </Form.Item>
        </Col>
      </Row>
    </Form>
    </div>
  )
}

function SchoolExperienceSetForm(props: ISchoolExperienceSetFormProps) {
  const { dispatch, schoolExperience = [], infoModuleList } = props;
  const handleChange = (values: ISchoolExperienceSetFormValues, index?:number) => {
    let newList = []
    const newValues = {
      ...values,
      start: dayjs(values?.start).format(format),
      end: dayjs(values?.end).format(format)
    }
    if(Number(index ?? -1) >= 0) {
      newList = schoolExperience?.map((item, idx) => {
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
        ...schoolExperience,
        newValues,
      ]
    }
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.SCHOOL_EXPERIENCE,
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
        key: ContentConfigKeyEnum.SCHOOL_EXPERIENCE,
        type,
        index,
      }
    })
  }

  return <div className="common-list-set-form-wrapper">
    {
      schoolExperience?.map?.((item, index) => {
        return <SchoolExperienceBaseSetForm
          key={`${item.name}-${item.start}-${item.end}-${item.job}-${item.content}-${index}`}
          onChange={(values: ISchoolExperienceSetFormValues) => {
            handleChange(values, index)
          }}
          length={schoolExperience.length}
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
      infoModuleList?.find(item => item.key === ContentConfigKeyEnum.SCHOOL_EXPERIENCE)?.title
    }</Button>
  </div>
}
export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    schoolExperience: editResume.schoolExperience,
    infoModuleList: editResume.moduleList
  }
})(SchoolExperienceSetForm)