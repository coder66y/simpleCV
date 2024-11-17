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
  return (
    <div className="skills-module-content-wrapper">
      {content && <QuillEditor readOnly value={content}/>}
      <Row justify="space-between">
      {
        data?.map(item => (
          <ReadItem
            needCol
            needPlace={false}
            value={
              <SliderWithValue
                disabled
                prefix={item.name}
                min={0}
                max={1}
                step={0.01}
                showValue={false}
                value={item.mastery.value}
                valueSuffix={item.showBar ? `${item.mastery.value * 100}%` : item.mastery.label}/>
            }
            key={`${item.name}-${item.mastery.value}-${item.showBar}`}
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