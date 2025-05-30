/*
 * @Description: 简历内容主体
 * @Author: luyi.lss
 * @Date: 2024-08-23 14:51:41
 * @LastEditors: luyi
 * @LastEditTime: 2025-01-03 16:11:17
 */
import { connect } from 'dva';
import { CSSProperties } from 'react';
import { FormattedMessage, IntlProvider } from 'react-intl';

import { ContentConfigKeyEnum } from '../../config';
import { useTheme } from '../../store/theme-context';
import { IModuleDataDispatchArgType, IModuleInfoConfig } from '../../types';
import ShowModuleContent from '../show-module-content';

import A4Container from '@/components/A4-contanier';
import enUS from '@/locales/en-US.json';
import zhCN from '@/locales/zh-CN.json';
import { EDIT_RESUME_NAME_SPACE, IEditResumeModel } from '@/models/edit-resume';

import './index.less';
import './template-1.less';
import './template-2.less';
import './template-3.less';
import './template-4.less';
export interface IEditContentProps {
  moduleList: IEditResumeModel['moduleList'];
  resumeInfo: IEditResumeModel['resumeInfo'];
  dispatch: React.Dispatch<IModuleDataDispatchArgType>;
}
function EditContent(props: IEditContentProps) {
  const { moduleList, resumeInfo, dispatch } = props;
  const {
    color,
    pageMargin,
    moduleMargin,
    secondaryColor,
    fontFamily,
    fontSize,
    language = 'zh-CN',
    lineHeight,
    templateId,
  } = useTheme();
  const messageMap = new Map<string, Record<string, any>>([
    ['zh-CN', zhCN],
    ['en-US', enUS],
  ]);

  const onContentClick = (item: IModuleInfoConfig) => {
    dispatch?.({
      type: `${EDIT_RESUME_NAME_SPACE}/changeCurrentEditContent`,
      payload: {
        config: item,
      },
    });
    dispatch?.({
      type: `${EDIT_RESUME_NAME_SPACE}/changeContentEditModalVisible`,
      payload: {
        visible: true,
      },
    });
  };

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

  const rootCls = `template-${templateId}`;

  return (
    <A4Container>
      <div className={`edit-resume ${rootCls}`} style={containerStyle} id="resumeContent">
        <IntlProvider messages={messageMap.get(language)} locale={language} defaultLocale="zh_CN">
          <div
            className={`${rootCls}-header`}
            style={{ color }}
            onClick={() => {
              onContentClick({
                key: ContentConfigKeyEnum.CV_INFO,
              });
            }}
          >
            <dl className="left-box">
              {resumeInfo?.title && <dt className="resume-title">{resumeInfo?.title}</dt>}
              <dd>
                <p>{resumeInfo?.slogan}</p>
                <p>Personal resume</p>
              </dd>
            </dl>
            <div className="right-box">
              <i className="iconfont">&#xe624;</i>
              <i className="iconfont">&#xe8ba;</i>
              <i className="iconfont">&#xe6f7;</i>
            </div>
          </div>
          <div className={`${rootCls}-line-box`}>
            <div className="line-left" style={{ backgroundColor: color }}>
              <i style={{ borderLeftColor: color }}></i>
            </div>
            <div className="line-right">
              <i></i>
            </div>
          </div>
          <div className={`${rootCls}-content`}>
            {moduleList?.map(item => {
              return item.hidden ? null : (
                <div className={`${rootCls}-info-module`} key={item.key}>
                  <div
                    onClick={e => {
                      onContentClick(item);
                    }}
                    className="module-title"
                  >
                    <span className={`title-text`}>
                      <i className={`iconfont title-${item.key}`}></i>
                      {item?.title !== item?.originalTitle ? (
                        item.title
                      ) : (
                        <FormattedMessage
                          id={item.key}
                          values={{
                            key: item.key,
                          }}
                        />
                      )}
                    </span>
                    <div className="title-icon">
                      <i></i>
                    </div>
                    <dfn></dfn>
                  </div>
                  <div className="module-line"></div>
                  <div className="module-content-main">
                    <ShowModuleContent configKey={item.key} />
                  </div>
                </div>
              );
            })}
          </div>
        </IntlProvider>
      </div>
    </A4Container>
  );
}

export default connect(({ editResume }: { editResume: IEditResumeModel }) => {
  return {
    moduleList: editResume.moduleList,
    resumeInfo: editResume.resumeInfo,
  };
})(EditContent);
