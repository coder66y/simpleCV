import QuillEditor from "@/components/quill-editor"
import ReadItem from "@/components/read-item"
import { IEditResumeModel, IEducationInfoValues } from "@/models/edit-resume"
import { Col } from "antd"
import { Row } from "antd/lib"
import { connect } from "dva"
import { injectIntl, IntlShape } from "react-intl"
export interface EducationInfoProps {
  education: IEducationInfoValues[];
  intl: IntlShape; 
}
function EducationInfo(props: EducationInfoProps) {
  const { education, intl } = props;
  const span= 8;
  const getIntl = (id: string) => {
    return intl.formatMessage({id})
  }
  return (
    <div className="education info-module-content-wrapper">
      {
        education?.map?.(item => (
          <>
          <Row className="education info-module-content" >
            <ReadItem needPlace className="left" value={
              <>
                <ReadItem value={item.start} suffix="&ensp;--&ensp;"/>
                {item.today ? getIntl('present') : <ReadItem value={item.end}/>}
              </>
            } needCol span={span}/>
            <ReadItem needPlace className="center" value={item.name} needCol span={span}/>
            <ReadItem needPlace className="right" value={
              <>
                <ReadItem value={item.major} />
                {item.degree ?  <ReadItem value={'(' + item.degree + ')'} /> : ''}
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