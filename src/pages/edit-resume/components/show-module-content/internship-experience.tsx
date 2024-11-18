import QuillEditor from "@/components/quill-editor"
import ReadItem from "@/components/read-item"
import { IEditResumeModel, IInternshipExperienceValues } from "@/models/edit-resume"
import { Col } from "antd"
import { Row } from "antd/lib"
import { connect } from "dva"
export interface InternshipExperienceProps {
  internshipExperience: IInternshipExperienceValues[]
}
function InternshipExperience(props: InternshipExperienceProps) {
  const { internshipExperience } = props;
  const span= 8;
  return (
    <div className="internship-experience info-module-content-wrapper">
      {
        internshipExperience?.map?.(item => (
          <>
          <Row className="internship-experience info-module-content" >
            <ReadItem needPlace className="left" value={
              <>
                <ReadItem value={item.start} suffix="&ensp;--&ensp;"/>
                {item.today ? '至今' : <ReadItem value={item.end}/>}
              </>
            } needCol span={span}/>
            <ReadItem needPlace className="center" value={item.name} needCol span={span}/>
            <ReadItem needPlace className="right" value={
              <>
                <ReadItem value={item.job} />
              </>
            } needCol span={span}/>
          </Row>
          {item?.content && <Row>
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
  internshipExperience: editResume.internshipExperience
})

export default connect(mapStateToProps)(InternshipExperience)