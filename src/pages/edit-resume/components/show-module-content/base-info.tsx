import ReadItem from "@/components/read-item"
import { IEditResumeModel, SelectOptionsType } from "@/models/edit-resume"
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
  const getIntlText = (id: string) => intl.formatMessage({id})
  const getIntlDate = (date: string) => intl.formatDate(date, {
    year: "numeric",
    month: 'short',
    day: 'numeric'
  })
  return (
    <Row wrap={true} className="base-info info-module-content-wrapper">
      {Object.entries(baseInfo || {})?.map(([key, value]) => {
        if(['photoShow', 'weight'].includes(key)) return null;
        if(key === 'photo') {
          return <div className="avatar-wrapper">
          {baseInfo?.photoShow ? <img className="avatar" key={key} src={baseInfo?.photo} /> : null}
        </div> 
        }
        if(key === 'birthday') {
          return <ReadItem key={key} span={colSpan1} className="read-item-birthday" value={baseInfo?.birthday ? getIntlDate(baseInfo?.birthday) : ''} label={getIntlText('birthday')} />
        }
        if(key === 'height') {
          return <ReadItem span={colSpan1} className="read-item-heightWeight" value={
            baseInfo?.height && baseInfo?.weight && <>
            <ReadItem value={baseInfo?.height} needCol={false}  label={`${getIntlText('height')}/${getIntlText('weight')}`} suffix={`cm ${" "}/${" "}`}/>
            <ReadItem value={baseInfo?.weight} needCol={false}  suffix="kg"/>
            </>
          } label="工作年限" />
        }
        if(['gender', 'workAge', 'maritalStatus', 'political', 'joinTime'].includes(key)) {
          const _value = (value as SelectOptionsType)?.value
          return <ReadItem key={key}  span={colSpan1} value={_value ? getIntlText(_value) : ''} label={getIntlText(key)} />
        }
        const _value = (value as string)
        return (
          <ReadItem  key={key}  span={colSpan1} className={`read-item-${key}`} suffix={key === 'age' ? '岁' : undefined} value={_value ?? ''} label={getIntlText(key)} />
        )
      })}
    </Row>
  )
}

const mapStateToProps = ({editResume}: { editResume: IEditResumeModel}) => ({
  baseInfo: editResume.baseInfo
})

export default connect(mapStateToProps)(injectIntl(BaseInfo))