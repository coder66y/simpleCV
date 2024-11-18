import { EDIT_RESUME_NAME_SPACE, IEditResumeModel, IProjectExperienceValues } from "@/models/edit-resume";
import { useDebounceFn } from "ahooks";
import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Space } from "antd"
import { connect } from "dva";
import QuillEditor from "@/components/quill-editor";
import dayjs from "@/components/extend-dayjs";
import type { Dayjs } from 'dayjs';
import { ContentConfigKeyEnum, SortTypeEnum } from "../../config";
import { ArrowDownOutlined, ArrowUpOutlined, DeleteOutlined } from "@ant-design/icons";

export interface IProjectExperienceSetFormProps {
  projectExperience?: IEditResumeModel['projectExperience'];
  dispatch: React.Dispatch<any>;
  infoModuleList?: IEditResumeModel['moduleList']
}
/** 表单属性 */
export interface IProjectExperienceBaseSetFormProps {
  initValues?: IProjectExperienceSetFormValues;
  onChange?: (values: IProjectExperienceSetFormValues, index: number) => void;
  index: number;
  length?: number;
  onSort?: (type: SortTypeEnum, index: number) => void
}

/** 表单初始值 */
export interface IProjectExperienceSetFormValues extends Omit<IProjectExperienceValues, 'start' | 'end'> {
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
function ProjectExperienceBaseSetForm(props: IProjectExperienceBaseSetFormProps) {
  const { initValues, onChange, index, length = 0, onSort } = props;
  const [form] = Form.useForm<IProjectExperienceSetFormValues>();
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
          <Form.Item name="name" label="项目名称">
            <Input />
          </Form.Item>
        </Col>
        <Col span={colSpan2}>
          <Form.Item name="job" label="参与角色">
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={gutter}>
        <Col span={colSpan1}>
          <Space>
            <Form.Item name="start" label="项目时间">
              <DatePicker format={format}/>
            </Form.Item>
            <Form.Item name="end">
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
      <Row gutter={gutter}>
        <Col span={24}>
          <Form.Item name="content" layout="vertical" label="项目内容：">
            <QuillEditor />
          </Form.Item>
        </Col>
      </Row>
    </Form>
    </div>
  )
}

function ProjectExperienceSetForm(props: IProjectExperienceSetFormProps) {
  const { dispatch, projectExperience = [], infoModuleList } = props;
  const handleChange = (values: IProjectExperienceSetFormValues, index?:number) => {
    let newList = []
    const newValues = {
      ...values,
      start: values?.start ? values?.start?.format(format) : null,
      end: values?.end ? values?.end?.format(format) : null
    }
    if(Number(index ?? -1) >= 0) {
      newList = projectExperience?.map((item, idx) => {
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
        ...projectExperience,
        newValues,
      ]
    }
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.PROJECT_EXPERIENCE,
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
        key: ContentConfigKeyEnum.PROJECT_EXPERIENCE,
        type,
        index,
      }
    })
  }

  return <div className="common-list-set-form-wrapper">
    {
      projectExperience?.map?.((item, index) => {
        return <ProjectExperienceBaseSetForm
          key={`${item.name}-${item.start}-${item.end}-${item.job}-${item.content}-${index}`}
          onChange={(values: IProjectExperienceSetFormValues) => {
            handleChange(values, index)
          }}
          length={projectExperience.length}
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
      infoModuleList?.find(item => item.key === ContentConfigKeyEnum.PROJECT_EXPERIENCE)?.title
    }</Button>
  </div>
}
export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    projectExperience: editResume.projectExperience,
    infoModuleList: editResume.moduleList
  }
})(ProjectExperienceSetForm)