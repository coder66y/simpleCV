import QuillEditor from "@/components/quill-editor"
import ReadItem from "@/components/read-item"
import { IEditResumeModel, IProjectExperienceValues } from "@/models/edit-resume"
import { Col } from "antd"
import { Row } from "antd/lib"
import { connect } from "dva"
export interface ProjectExperienceProps {
  projectExperience: IProjectExperienceValues[]
}
function ProjectExperience(props: ProjectExperienceProps) {
  const { projectExperience } = props;
  const span= 8;
  return (
    <div className="project-experience-info-module-content-wrapper">
      {
        projectExperience?.map?.(item => (
          <>
          <Row className="project-experience-info-module-content" >
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
          <Row>
            <Col span={24}>
            <QuillEditor readOnly value={item.content}/>
            </Col>
          </Row>
          </>
        ))
      }
    </div>
  )
}

const mapStateToProps = ({editResume}: { editResume: IEditResumeModel}) => ({
  projectExperience: editResume.projectExperience
})

export default connect(mapStateToProps)(ProjectExperience)