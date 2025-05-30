import { connect } from 'dva';

import QuillEditor from '@/components/quill-editor';
import { IEditResumeModel } from '@/models/edit-resume';
export interface CustomizationProps {
  customization: string;
}
function Customization(props: CustomizationProps) {
  const { customization } = props;

  return (
    <div className="customization info-module-content-wrapper">
      {customization && <QuillEditor readOnly value={customization} />}
    </div>
  );
}

const mapStateToProps = ({ editResume }: { editResume: IEditResumeModel }) => ({
  customization: editResume.customization,
});

export default connect(mapStateToProps)(Customization);
