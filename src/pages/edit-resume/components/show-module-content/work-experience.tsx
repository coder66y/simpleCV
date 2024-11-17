import QuillEditor from "@/components/quill-editor"
import ReadItem from "@/components/read-item"
import { IEditResumeModel, IWorkExperienceValues } from "@/models/edit-resume"
import { Col } from "antd"
import { Row } from "antd/lib"
import { connect } from "dva"
export interface WorkExperienceProps {
  workExperience: IWorkExperienceValues[]
}
function WorkExperience(props: WorkExperienceProps) {
  const { workExperience } = props;
  const span= 8;
  return (
    <div className="workExperience-info-module-content-wrapper">
      {
        workExperience?.map?.(item => (
          <>
          <Row className="workExperience-info-module-content" >
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

export default connect(mapStateToProps)(WorkExperience)