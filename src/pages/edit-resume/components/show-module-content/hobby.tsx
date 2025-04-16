import { Row, Tag } from 'antd';
import { connect } from 'dva';

import QuillEditor from '@/components/quill-editor';
import { IEditResumeModel, IHobbyValues } from '@/models/edit-resume';
export interface HobbyProps {
  hobby: IHobbyValues;
}
function Hobby(props: HobbyProps) {
  const { hobby } = props;
  const { data, content } = hobby ?? {};
  return (
    <div className="hobby-module-content-wrapper">
      {content && <QuillEditor readOnly value={content} />}
      <Row>{data?.map((item) => <Tag key={item}>{item}</Tag>)}</Row>
    </div>
  );
}

const mapStateToProps = ({ editResume }: { editResume: IEditResumeModel }) => ({
  hobby: editResume.hobby,
});

export default connect(mapStateToProps)(Hobby);
