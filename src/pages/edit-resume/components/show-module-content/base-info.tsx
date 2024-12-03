import ReadItem from "@/components/read-item"
import { IEditResumeModel } from "@/models/edit-resume"
import { Col, Row } from "antd"
import { connect } from "dva"
import { injectIntl, IntlShape } from "react-intl"

export interface IBaseInfoProps {
  baseInfo: IEditResumeModel['baseInfo'],
  intl: IntlShape
}

function BaseInfo(props: IBaseInfoProps) {
  const { baseInfo, intl } = props
  const colSpan1 = 11;
  const colSpan2 = 2;
  
  const getIntlText = (id: string) => intl.formatMessage({id})

  return (
    <Row wrap={true} className="base-info info-module-content-wrapper">
      <Col span={colSpan1}>
        <ReadItem value={baseInfo?.name} label={getIntlText("name")} />
      </Col>
      <Col span={colSpan1}>
        <ReadItem value={baseInfo?.birthday} label={getIntlText('birthday')} />
      </Col>
      <Col span={colSpan2}>
        {baseInfo?.photoShow ? <img className="avatar" width={120} src={baseInfo?.photo} /> : null}
      </Col> 
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.gender?.value ? getIntlText(baseInfo?.gender?.value) : ''} label={getIntlText('gender')} />
      <ReadItem span={colSpan1} suffix="岁" needCol={true} value={baseInfo?.age} label={getIntlText('age')} />
      <Col span={colSpan1}>
        <ReadItem value={baseInfo?.phone} label={getIntlText('phone')} />
      </Col>
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.email} label={getIntlText('email')} />
      <ReadItem span={colSpan1} needCol={true} value={getIntlText(baseInfo?.workAge?.value ?? '')} label={getIntlText('workAge')} />
      <ReadItem span={colSpan1} needCol={true} value={
        baseInfo?.height && baseInfo?.weight && <>
        <ReadItem value={baseInfo?.height} label={`${getIntlText('height')}/${getIntlText('weight')}`} suffix={`cm ${" "}/${" "}`}/>
        <ReadItem value={baseInfo?.weight} suffix="kg"/>
        </>
      } label="工作年限" />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.nativePlace} label={getIntlText('nativePlace')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.maritalStatus?.value ? getIntlText(baseInfo?.maritalStatus?.value) : ''} label={getIntlText('maritalStatus')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.political?.value ? getIntlText(baseInfo?.political?.value) : ''} label={getIntlText('political')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.nationality} label={getIntlText('nationality')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.post} label={getIntlText('post')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.salary} label={getIntlText('salary')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.city} label={getIntlText('city')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.joinTime?.value ? getIntlText(baseInfo?.joinTime?.value) : ''} label={getIntlText('joinTime')} />
    </Row>
  )
}

const mapStateToProps = ({editResume}: { editResume: IEditResumeModel}) => ({
  baseInfo: editResume.baseInfo
})

export default connect(mapStateToProps)(injectIntl(BaseInfo))