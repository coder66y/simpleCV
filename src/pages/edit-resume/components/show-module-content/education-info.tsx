import QuillEditor from "@/components/quill-editor"
import ReadItem from "@/components/read-item"
import { IEditResumeModel, IEducationInfoValues } from "@/models/edit-resume"
import { Col, Row } from "antd"
import { connect } from "dva"
import { injectIntl, IntlShape } from "react-intl"
export interface EducationInfoProps {
  education: IEducationInfoValues[];
  intl: IntlShape; 
}
function EducationInfo(props: EducationInfoProps) {
  const { education, intl } = props;
  const span= 8;
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
  return (
    <div className="education info-module-content-wrapper">
      {
        education?.map?.(item => (
          <>
          <Row className="education info-module-content" >
            <ReadItem needPlace className="left" value={
              <>
                <ReadItem value={getIntlTime(item.start)} suffix="&ensp;-&ensp;"/>
                {item.today ? getIntlText('present') : <ReadItem value={getIntlTime(item.end)}/>}
              </>
            } needCol span={span}/>
            <ReadItem needPlace className="center" value={item.name} needCol span={span}/>
            <ReadItem needPlace className="right" value={
              <>
                <ReadItem value={item.major} />
                {item.degree.value ? <ReadItem value={'(' + getIntlText(item.degree.value) + ')'} /> : ''}
              </>
            } needCol span={span}/>
          </Row>
          { item?.content && <Row>
            <Col span={24}>
            <QuillEditor readOnly value={item.content}/>
            </Col>
          </Row>
          }
          </>
        ))
      }
    </div>
  )
}

const mapStateToProps = ({editResume}: { editResume: IEditResumeModel}) => ({
  education: editResume.education
})

export default connect(mapStateToProps)(injectIntl(EducationInfo))