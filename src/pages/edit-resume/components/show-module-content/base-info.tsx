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
  
  const getLabel = (id: string) => intl.formatMessage({id})

  return (
    <Row wrap={true} className="base-info info-module-content-wrapper">
      <Col span={colSpan1}>
        <ReadItem value={baseInfo?.name} label={getLabel("name")} />
      </Col>
      <Col span={colSpan1}>
        <ReadItem value={baseInfo?.birthday} label={getLabel('birthday')} />
      </Col>
      <Col span={colSpan2}>
        {baseInfo?.photoShow ? <img className="avatar" width={120} src={baseInfo?.photo} /> : null}
      </Col> 
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.gender} label={getLabel('gender')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.age} label={getLabel('age')} />
      <Col span={colSpan1}>
        <ReadItem value={baseInfo?.phone} label={getLabel('phone')} />
      </Col>
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.email} label={getLabel('email')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.workAge} label={getLabel('workAge')} />
      <ReadItem span={colSpan1} needCol={true} value={
        baseInfo?.height && baseInfo?.weight && <>
        <ReadItem value={baseInfo?.height} label={`${getLabel('height')}/${getLabel('weight')}`} suffix={`cm ${" "}/${" "}`}/>
        <ReadItem value={baseInfo?.weight} suffix="kg"/>
        </>
      } label="工作年限" />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.nativePlace} label={getLabel('nativePlace')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.maritalStatus} label={getLabel('maritalStatus')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.political} label={getLabel('political')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.nationality} label={getLabel('nationality')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.post} label={getLabel('post')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.salary} label={getLabel('salary')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.city} label={getLabel('city')} />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.joinTime} label={getLabel('joinTime')} />
    </Row>
  )
}

const mapStateToProps = ({editResume}: { editResume: IEditResumeModel}) => ({
  baseInfo: editResume.baseInfo
})

export default connect(mapStateToProps)(injectIntl(BaseInfo))