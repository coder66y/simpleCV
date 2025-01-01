import QuillEditor from "@/components/quill-editor"
import { IEditResumeModel, IHonorsValues } from "@/models/edit-resume"
import { Row, Tag } from "antd"
import { connect } from "dva"
export interface HonorsProps {
  honors: IHonorsValues;
}
function Honors(props: HonorsProps) {
  const { honors } = props;
  const { data, content } = honors ?? {}
  return (
    <div className="honors-module-content-wrapper">
      {content && <QuillEditor readOnly value={content}/>}
      <Row>
      {
        data?.map(item => (
          <Tag key={item}>{item}</Tag>
        ))
      }
      </Row>
      
    </div>
  )
}

const mapStateToProps = ({editResume}: { editResume: IEditResumeModel}) => ({
  honors: editResume.honors
})

export default connect(mapStateToProps)(Honors)