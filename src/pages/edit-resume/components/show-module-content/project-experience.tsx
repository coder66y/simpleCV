import { Col, Row } from 'antd';
import { connect } from 'dva';
import { injectIntl, IntlShape } from 'react-intl';

import { DATE_FORMAT_CONFIG } from '../../config';

import QuillEditor from '@/components/quill-editor';
import ReadItem from '@/components/read-item';
import { IEditResumeModel, IProjectExperienceValues } from '@/models/edit-resume';
export interface ProjectExperienceProps {
  projectExperience: IProjectExperienceValues[];
  intl: IntlShape;
}
function ProjectExperience(props: ProjectExperienceProps) {
  const { projectExperience, intl } = props;
  const span = 8;
  const getIntlText = (id: string) => intl.formatMessage({ id });
  const getIntlTime = (date: string) => {
    return intl.formatDate(date, DATE_FORMAT_CONFIG);
  };
  return (
    <div className="project-experience info-module-content-wrapper">
      {projectExperience?.map?.(item => (
        <div key={item.id}>
          <Row className="project-experience info-module-content">
            <ReadItem
              needPlace
              className="left"
              value={
                <>
                  <ReadItem
                    needCol={false}
                    value={getIntlTime(item.start)}
                    suffix="&ensp;-&ensp;"
                  />
                  {item.today ? (
                    getIntlText('present')
                  ) : (
                    <ReadItem needCol={false} value={getIntlTime(item.end)} />
                  )}
                </>
              }
              needCol
              span={span}
            />
            <ReadItem needPlace className="center" value={item.name} needCol span={span} />
            <ReadItem
              needPlace
              className="right"
              value={
                <>
                  <ReadItem value={item.job} />
                </>
              }
              needCol
              span={span}
            />
          </Row>
          {item?.content && (
            <Row>
              <Col span={24}>
                <QuillEditor readOnly value={item.content} />
              </Col>
            </Row>
          )}
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = ({ editResume }: { editResume: IEditResumeModel }) => ({
  projectExperience: editResume.projectExperience,
});

export default connect(mapStateToProps)(injectIntl(ProjectExperience));
