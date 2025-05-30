import { Row } from 'antd/lib';
import { connect } from 'dva';
import { injectIntl, IntlShape } from 'react-intl';

import QuillEditor from '@/components/quill-editor';
import ReadItem from '@/components/read-item';
import { SliderWithValue } from '@/components/slider-with-value';
import { IEditResumeModel, ISkillsValues } from '@/models/edit-resume';
export interface SkillsProps {
  skills: ISkillsValues;
  intl: IntlShape;
}
function Skills(props: SkillsProps) {
  const { skills, intl } = props;
  const { data, content } = skills ?? {};
  const getIntlText = (id: string) => intl.formatMessage({ id });
  return (
    <div className="skills info-module-content-wrapper">
      {content && <QuillEditor readOnly value={content} />}
      <Row justify="space-between">
        {data?.map((item, index) => (
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
                value={item?.mastery?.value}
                valueSuffix={
                  item.showBar
                    ? `${item.mastery.value * 100}%`
                    : getIntlText(`${item.mastery.value}`)
                }
              />
            }
            key={`${item.name}${index}`}
          />
        ))}
      </Row>
    </div>
  );
}

const mapStateToProps = ({ editResume }: { editResume: IEditResumeModel }) => ({
  skills: editResume.skills,
});

export default connect(mapStateToProps)(injectIntl(Skills));
