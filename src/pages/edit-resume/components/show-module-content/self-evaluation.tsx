import QuillEditor from "@/components/quill-editor"
import { IEditResumeModel } from "@/models/edit-resume"
import { connect } from "dva"
export interface SelfEvaluationProps {
  selfEvaluation: string;
}
function SelfEvaluation(props: SelfEvaluationProps) {
  const { selfEvaluation } = props;

  return (
    <div className="self-evaluation-module-content-wrapper">
      {selfEvaluation && <QuillEditor readOnly value={selfEvaluation}/>}
    </div>
  )
}

const mapStateToProps = ({editResume}: { editResume: IEditResumeModel}) => ({
  selfEvaluation: editResume.selfEvaluation
})

export default connect(mapStateToProps)(SelfEvaluation)