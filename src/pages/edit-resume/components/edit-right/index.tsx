/*
 * @Description: 简历编辑页面右侧栏
 * @Author: luyi.lss
 * @Date: 2024-08-23 14:50:44
 * @LastEditors: luyi
 * @LastEditTime: 2025-05-30 15:19:12
 */
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Tabs, Switch, Button, Space } from 'antd';
import { connect } from 'dva';
import React, { useContext, useMemo } from 'react';

import './index.less';

import { IModuleDataDispatchArgType, IModuleInfoConfig } from '../../types';

import { EDIT_RESUME_NAME_SPACE, IEditResumeModel } from '@/models/edit-resume';
import { ContentConfigKeyEnum, MODULE_CONFIG, THEME_CONFIG } from '@/pages/edit-resume/config';

const rootCls = 'edit-right';
export interface IEditRightProps {
  moduleList: IModuleInfoConfig[];
  dispatch: React.Dispatch<IModuleDataDispatchArgType>;
}

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      className="drag-icon"
      icon={<i className="iconfont">&#xe68d;</i>}
      style={{ cursor: 'move' }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  'data-row-key': string;
}
interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}
const SortRow = (props: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props['data-row-key'] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

function EditRight(props: IEditRightProps) {
  const { moduleList = [], dispatch } = props;
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    })
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const oldIndex = moduleList.findIndex(i => i.key === active.id);
      const newIndex = moduleList.findIndex(i => i.key === over?.id);
      if (newIndex === 0) return;
      dispatch({
        type: 'editResume/sortModule',
        payload: {
          oldIndex,
          newIndex,
        },
      });
    }
  };

  const onClick = (item: IModuleInfoConfig) => {
    dispatch({
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

  return (
    <div className={`${rootCls}`}>
      <Tabs>
        {THEME_CONFIG.rightTabs.map(it => {
          return (
            <Tabs.TabPane key={it.key} tab={it.title}>
              {
                <DndContext
                  sensors={sensors}
                  modifiers={[restrictToVerticalAxis]}
                  onDragEnd={onDragEnd}
                >
                  <SortableContext
                    items={moduleList.map(i => i.key)}
                    strategy={verticalListSortingStrategy}
                  >
                    {moduleList.map(item => {
                      return (
                        <SortRow data-row-key={item.key} key={item.key}>
                          <Space
                            onClick={() => {
                              onClick(item);
                            }}
                            key={item.key}
                            size={14}
                            className="info-module-item"
                            data-row-key={item.key}
                          >
                            {MODULE_CONFIG.icons.get(item.key)}
                            <div className="module-title">{item.title}</div>
                            {item.key !== ContentConfigKeyEnum.BASIC_INFO && (
                              <Switch
                                value={!item.hidden}
                                onChange={(
                                  checked: boolean,
                                  event: React.MouseEvent<HTMLButtonElement>
                                ) => {
                                  event.stopPropagation();
                                  dispatch({
                                    type: 'editResume/changeModuleHidden',
                                    payload: {
                                      key: item.key,
                                      hidden: !item.hidden,
                                    },
                                  });
                                }}
                              />
                            )}
                            {item.key !== ContentConfigKeyEnum.BASIC_INFO && <DragHandle />}
                          </Space>
                        </SortRow>
                      );
                    })}
                  </SortableContext>
                </DndContext>
              }
            </Tabs.TabPane>
          );
        })}
      </Tabs>
    </div>
  );
}

export default connect(({ editResume }: { editResume: IEditResumeModel }) => {
  return {
    moduleList: editResume.moduleList ?? [],
  };
})(EditRight);
