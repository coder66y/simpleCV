import QuillEditor from "@/components/quill-editor"
import ReadItem from "@/components/read-item"
import { IEditResumeModel, IEducationInfoValues } from "@/models/edit-resume"
import { Col } from "antd"
import { Row } from "antd/lib"
import { connect } from "dva"
export interface EducationInfoProps {
  education: IEducationInfoValues[]
}
function EducationInfo(props: EducationInfoProps) {
  const { education } = props;
  const span= 8;
  return (
    <div className="education-info-module-content-wrapper">
      {
        education?.map?.(item => (
          <>
          <Row className="education-info-module-content" >
            <ReadItem className="left" value={
              <>
                <ReadItem value={item.start} suffix="&ensp;--&ensp;"/>
                <ReadItem value={item.end}/>
              </>
            } needCol span={span}/>
            <ReadItem className="center" value={item.name} needCol span={span}/>
            <ReadItem className="right" value={
              <>
                <ReadItem value={item.major} />
                {item.degree ?  <ReadItem value={'(' + item.degree + ')'} /> : ''}
              </>
            } needCol span={span}/>
          </Row>
          <Row>
            <Col span={24}>
            <QuillEditor readOnly={true} value={item.content}/>
            </Col>
          </Row>
          </>
        ))
      }
    </div>
  )
}

const mapStateToProps = ({editResume}: { editResume: IEditResumeModel}) => ({
  education: editResume.education
})

export default connect(mapStateToProps)(EducationInfo)