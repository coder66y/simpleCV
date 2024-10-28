import ReadItem from "@/components/read-item"
import { IEditResumeModel } from "@/models/edit-resume"
import { Col, Row } from "antd"
import { connect } from "dva"

export interface IBaseInfoProps {
  baseInfo: IEditResumeModel['baseInfo']
}

function BaseInfo(props: IBaseInfoProps) {
  const { baseInfo } = props
  const colSpan1 = 11;
  const colSpan2 = 2;

  return (
    <Row wrap={true} className="base-info-module-content">
      <Col span={colSpan1}>
        <ReadItem value={baseInfo?.name} label="姓&emsp;&emsp;名" />
      </Col>
      <Col span={colSpan1}>
        <ReadItem value={baseInfo?.birthday} label="出生日期" />
      </Col>
      <Col span={colSpan2}>
        {baseInfo?.photoShow ? <img className="avatar" width={100} src={baseInfo?.photo} /> : null}
      </Col> 
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.gender} label="性&emsp;&emsp;别" />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.age} label="年&emsp;&emsp;龄" />
      <Col span={colSpan1}>
        <ReadItem value={baseInfo?.phone} label="联系电话" />
      </Col>
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.email} label="邮&emsp;&emsp;箱" />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.workAge} label="工作年限" />
      <ReadItem span={colSpan1} needCol={true} value={
        baseInfo?.height && baseInfo?.weight && <>
        <ReadItem value={baseInfo?.height} label="身高体重" suffix={`cm ${" "}/${" "}`}/>
        <ReadItem value={baseInfo?.weight} suffix="kg"/>
        </>
      } label="工作年限" />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.nativePlace} label="籍&emsp;&emsp;贯" />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.maritalStatus} label="婚姻状况" />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.political} label="政治面貌" />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.nationality} label="民&emsp;&emsp;族" />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.post} label="求职意向" />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.salary} label="期望薪资" />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.city} label="意向城市" />
      <ReadItem span={colSpan1} needCol={true} value={baseInfo?.joinTime} label="到岗时间" />
    </Row>
  )
}

const mapStateToProps = ({editResume}: { editResume: IEditResumeModel}) => ({
  baseInfo: editResume.baseInfo
})

export default connect(mapStateToProps)(BaseInfo)