import QuillEditor from "@/components/quill-editor"
import ReadItem from "@/components/read-item"
import { IEditResumeModel, IWorkExperienceValues } from "@/models/edit-resume"
import { Col, Row } from "antd"
import { connect } from "dva"
import { injectIntl, IntlShape } from "react-intl"
export interface WorkExperienceProps {
  intl: IntlShape;
  workExperience: IWorkExperienceValues[]
}
function WorkExperience(props: WorkExperienceProps) {
  const { workExperience, intl } = props;
  const getIntlText = (id: string) => {
    return intl.formatMessage({id})
  }

  const getIntlTime = (date: string) => {
    return intl.formatDate(date, {
      month: 'short',
      year: "numeric",
      day: 'numeric'
    })
  }

  const span= 8;
  return (
    <div className="work-experience info-module-content-wrapper">
      {
        workExperience?.map?.(item => (
          <>
          <Row className="work-experience info-module-content" >
            <ReadItem needPlace className="left" value={
              <>
                <ReadItem value={getIntlTime(item.start)} suffix="&ensp;-&ensp;"/>
                {item.today ? getIntlText('present') : <ReadItem value={getIntlTime(item.end)}/>}
              </>
            } needCol span={span}/>
            <ReadItem needPlace className="center" value={item.name} needCol span={span}/>
            <ReadItem needPlace className="right" value={
              <>
                <ReadItem value={item.job} />
              </>
            } needCol span={span}/>
          </Row>
          { item?.content && <Row>
            <Col span={24}>
            <QuillEditor readOnly value={item.content}/>
            </Col>
          </Row>}
          </>
        ))
      }
    </div>
  )
}

const mapStateToProps = ({editResume}: { editResume: IEditResumeModel}) => ({
  workExperience: editResume.workExperience
})

export default connect(mapStateToProps)(injectIntl(WorkExperience))