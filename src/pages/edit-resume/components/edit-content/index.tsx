/*
 * @Description: 简历内容主体
 * @Author: luyi.lss
 * @Date: 2024-08-23 14:51:41
 * @LastEditors: luyi.lss
 * @LastEditTime: 2024-11-04 01:38:18
 */
import './index.less';
import { BulbFilled, CalendarFilled, EditFilled } from '@ant-design/icons';
import { useTheme } from '../../store/theme-context';
import { IModuleDataDispatchArgType, IModuleInfoConfig } from '../../types';
import { FormattedMessage, IntlProvider } from 'react-intl';
import enUS from '@/locales/en-US.json';
import zhCN from '@/locales/zh-CN.json';
import { useState } from 'react';
import { ContentConfigKeyEnum } from '../../config';
import ContentEditModal from '../content-edit-modal';
import { connect } from 'dva';
import { IEditResumeModel } from '@/models/edit-resume';
import ShowModuleContent from '../show-module-content';

const rootCls = 'edit-resume';
export interface IEditContentProps {
  moduleList: IEditResumeModel['moduleList'];
  resumeInfo: IEditResumeModel['resumeInfo'];
  dispatch: React.Dispatch<IModuleDataDispatchArgType>;
}
function EditContent(props: IEditContentProps) {
  const { moduleList, resumeInfo  } = props;
  const { color, pageMargin, moduleMargin, secondaryColor, fontFamily, fontSize, language = "zh-CN", lineHeight } = useTheme();
  const messageMap = new Map([
    ['zh-CN', zhCN],
    ['en-US', enUS]
  ])
  const [editContent, setEditContent] = useState<IModuleInfoConfig>({
    key: ContentConfigKeyEnum.CV_INFO,
  })
  const [visible, setVisible] = useState<boolean>(false)
  const onContentClick = (key: ContentConfigKeyEnum, title?: string) => {
    
    setEditContent({
      key,
      title
    });
    setVisible(true);
  }

  const onModalClose = () => {
    setVisible(false)
  }

  const changeModuleTitle = (title: string) => {
    setEditContent({
      ...editContent,
      title
    })
    props.dispatch({
      type: 'editResume/changeModuleTitle',
      payload: {
        key: editContent.key,
        title,
      }
    })
  }

  return (
      <div className={`${rootCls}`} style={{'--primaryColor': color, '--secondaryColor': secondaryColor,  '--pageMargin': `${pageMargin}px`, '--moduleMargin': `${moduleMargin}px`, fontFamily: fontFamily, '--fontSize': `${fontSize}px`, '--lineHeight': lineHeight, '--fontFamily': fontFamily}}>
        <IntlProvider messages={messageMap.get(language)} locale={language} defaultLocale="zh_CN">
          <div className={`${rootCls}-header`} style={{color}} onClick={() => {
            onContentClick(ContentConfigKeyEnum.CV_INFO)
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
                onClick={(e) => {
                  onContentClick(item.key, item.title)
                }}
                className={`${rootCls}-info-module`}
                key={item.key}
              >
                <div className='module-title' style={{backgroundColor: color}}>
                  <span className='title-text'>
                    <FormattedMessage id={item.key} values={{
                      key: item.key,
                      title: item.title
                    }}/>
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
        <ContentEditModal
          configKey={editContent.key}
          title={editContent.title}
          visible={visible}
          changeModuleTitle={changeModuleTitle}
          onClose={onModalClose}
        />
      </div>
  )
}

export default connect(({editResume}: {editResume: IEditResumeModel}) => {
  return {
    moduleList: editResume.moduleList,
    resumeInfo: editResume.resumeInfo
  }
})(EditContent)