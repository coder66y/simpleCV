import { Col, Row } from 'antd';
import { connect } from 'dva';

import { ContentConfigKeyEnum } from '../../config';

import QuillEditor from '@/components/quill-editor';
import { EDIT_RESUME_NAME_SPACE, IEditResumeModel } from '@/models/edit-resume';

export interface IHonorsSetFormProps {
  dispatch: React.Dispatch<any>;
  selfEvaluation: IEditResumeModel['selfEvaluation'];
  infoModuleList: IEditResumeModel['moduleList'];
}

function SelfEvaluationSetForm(props: IHonorsSetFormProps) {
  const { infoModuleList, dispatch, selfEvaluation } = props;
  const title =
    infoModuleList?.find(
      (item) => item.key === ContentConfigKeyEnum.SELF_EVALUATION,
    )?.title ?? '';
  const onChangeContent = (value: string) => {
    dispatch({
      type: `${EDIT_RESUME_NAME_SPACE}/changeFormValues`,
      payload: {
        key: ContentConfigKeyEnum.SELF_EVALUATION,
        value,
      },
    });
  };

  return (
    <div className="self-evaluation-set-form-wrapper">
      <Row>
        <Col span={24}>
          <div className="desc-title">{title}描述：</div>
          <QuillEditor value={selfEvaluation} onChange={onChangeContent} />
        </Col>
      </Row>
    </div>
  );
}

export default connect(({ editResume }: { editResume: IEditResumeModel }) => {
  return {
    selfEvaluation: editResume.selfEvaluation,
    infoModuleList: editResume.moduleList,
  };
})(SelfEvaluationSetForm);
