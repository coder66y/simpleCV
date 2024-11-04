import QuillEditor from "@/components/quill-editor"
import ReadItem from "@/components/read-item"
import { SliderWithValue } from "@/components/slider-with-value"
import { IEditResumeModel, ISkillsValues } from "@/models/edit-resume"
import { Col } from "antd"
import { Row } from "antd/lib"
import { connect } from "dva"
export interface SkillsProps {
  skills: ISkillsValues;
}
function Skills(props: SkillsProps) {
  const { skills } = props;
  const { data, content } = skills ?? {}
  const span = 8;
  return (
    <div className="skills-module-content-wrapper">
      <QuillEditor readOnly value={content}/>
      <Row>
      {
        data?.map(item => (
          <ReadItem
            needCol
            value={
              <SliderWithValue prefix={item.name} value={item.mastery.value} suffix={item.mastery.label}/>
            }
            span={span}
            key={item.name}
          />
        ))
      }
      </Row>
      
    </div>
  )
}

const mapStateToProps = ({editResume}: { editResume: IEditResumeModel}) => ({
  skills: editResume.skills
})

export default connect(mapStateToProps)(Skills)