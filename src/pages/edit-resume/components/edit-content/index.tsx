/*
 * @Description: 简历内容主体
 * @Author: luyi.lss
 * @Date: 2024-08-23 14:51:41
 * @LastEditors: luyi.lss
 * @LastEditTime: 2024-12-05 17:01:52
 */
import './index.less';
import { BulbFilled, CalendarFilled, EditFilled } from '@ant-design/icons';
import { useTheme } from '../../store/theme-context';
import { IModuleDataDispatchArgType, IModuleInfoConfig } from '../../types';
import { FormattedMessage, IntlProvider } from 'react-intl';
import enUS from '@/locales/en-US.json';
import zhCN from '@/locales/zh-CN.json';
import { CSSProperties, useEffect } from 'react';
import { ContentConfigKeyEnum } from '../../config';
import { connect } from 'dva';
import { EDIT_RESUME_NAME_SPACE, IEditResumeModel } from '@/models/edit-resume';
import ShowModuleContent from '../show-module-content';
import A4Container from '@/components/A4-contanier';

const rootCls = 'edit-resume';
export interface IEditContentProps {
  moduleList: IEditResumeModel['moduleList'];
  resumeInfo: IEditResumeModel['resumeInfo'];
  dispatch: React.Dispatch<IModuleDataDispatchArgType>;
}
function EditContent(props: IEditContentProps) {
  const { moduleList, resumeInfo, dispatch  } = props;
  const { color, pageMargin, moduleMargin, secondaryColor, fontFamily, fontSize, language = "zh-CN", lineHeight } = useTheme();
  const messageMap = new Map<string, Record<string, any>>([
    ['zh-CN', zhCN],
    ['en-US', enUS]
  ])

  const onContentClick = (item: IModuleInfoConfig) => {
    dispatch?.({
      type: `${EDIT_RESUME_NAME_SPACE}/changeCurrentEditContent`,
      payload: {
        config: item
      }
    })
    dispatch?.({
      type: `${EDIT_RESUME_NAME_SPACE}/changeContentEditModalVisible`,
      payload: {
        visible: true
      }
    })
  }

  const containerStyle: CSSProperties = {
    fontFamily: fontFamily,
    '--primaryColor': color,
    '--secondaryColor': secondaryColor,
    '--pageMargin': `${pageMargin}px`,
    '--moduleMargin': `${moduleMargin}px`,
    '--fontSize': `${fontSize}px`,
    '--lineHeight': lineHeight,
    '--fontFamily': fontFamily,
  } as CSSProperties;



  return (
    <A4Container>
      <div className={`${rootCls}`} style={containerStyle} id="resumeContent">
        <IntlProvider messages={messageMap.get(language)} locale={language} defaultLocale="zh_CN">
          <div className={`${rootCls}-header`} style={{color}} onClick={() => {
            onContentClick({
              key: ContentConfigKeyEnum.CV_INFO,
            })
          }}>
            <dl className="left-box" >
              {
                resumeInfo?.title && <dt className="resume-title">
                {resumeInfo?.title}
              </dt>
              }
              <dd>
                <p>
                  {resumeInfo?.slogan}
                </p> Personal resume
              </dd>
            </dl>
            <div className='right-box'>
              <BulbFilled />
              <CalendarFilled />
              <EditFilled />
            </div>
          </div>
          <div className={`${rootCls}-line-box`}>
            <div className='line-left' style={{backgroundColor: color}}>
              <i style={{borderLeftColor: color}}></i>
            </div>
            <div className='line-right'>
              <i></i>
            </div>
          </div>
          <div className={`${rootCls}-content`}>
          {
            moduleList?.map(item => {
              return item.hidden ? null : <div
                className={`${rootCls}-info-module`}
                key={item.key}
                onClick={(e) => {
                  onContentClick(item)
                }}
              >
                <div
                  className='module-title'
                >
                  <span className='title-text'>
                    {
                    item?.title !== item?.originalTitle ? item.title :<FormattedMessage
                      id={item.key}
                      values={{
                        key: item.key,
                      }}/>
                    }
                  </span>
                  <div className='title-icon'>
                    <i></i>
                  </div>
                  <dfn></dfn>
                </div>
                <div className='module-line'>
                </div>
                <div className='module-content-main'>
                  <ShowModuleContent configKey={item.key}/>
                </div>
              </div>
            })
          }
          </div>
        </IntlProvider>
      </div>
    </A4Container>
  )
}

export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    moduleList: editResume.moduleList,
    resumeInfo: editResume.resumeInfo
  }
})(EditContent)