/*
 * @Description: 简历编辑页面右侧栏
 * @Author: luyi.lss
 * @Date: 2024-08-23 14:50:44
 * @LastEditors: luyi.lss
 * @LastEditTime: 2024-09-24 22:44:42
 */
import React from 'react'
import { useContext, useMemo } from 'react'
import { DndContext, DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core'
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities'
import { CSS } from '@dnd-kit/utilities';
import { Tabs, Switch, Button, Space } from 'antd'
import { DragOutlined } from '@ant-design/icons'

import { infoModuleIconMap, rightTabConfig } from '@/pages/edit-resume/config'
import './index.less'
import { IInfoIconConfig, IModuleDataDispatchArgType } from '../../types';

const rootCls = 'edit-right'
export interface IEditRightProps {
  moduleList: IInfoIconConfig[];
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
      className='drag-icon'
      icon={<DragOutlined />}
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
const Row = (props: RowProps) => {
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
    [setActivatorNodeRef, listeners],
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

export default function EditRight(props: IEditRightProps) {
  const { moduleList = [], dispatch } = props;
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const oldIndex = moduleList.findIndex((i) => i.key === active.id);
      const newIndex = moduleList.findIndex((i) => i.key === over?.id);
      if(newIndex === 0) return;
      dispatch({
        type: 'sort',
        payload: {
          oldIndex,
          newIndex,
        }
      })
    }
  };
  
  return (
    <div className={`${rootCls}`}>
      <Tabs>
        {
          rightTabConfig.map(it => {
            return <Tabs.TabPane key={it.key} tab={it.title}>
              {
                <DndContext sensors={sensors} modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
                <SortableContext
                  items={moduleList.map((i) => i.key)}
                  strategy={verticalListSortingStrategy}
                >
                  {
                    moduleList.map(item => {
                      return <Row key={item.key} className='info-module-item' data-row-key={item.key}>
                        <Space className='module-right' size={18}>
                          {
                            infoModuleIconMap.get(item.key)
                          }
                          <div>{item.title}</div>
                          {
                            item.key !== 'basicInfo' && <Switch
                              value={!item.hidden}
                              onChange={() => {
                              dispatch({
                                type: 'changeHidden',
                                payload: {
                                  key: item.key,
                                  hidden: !item.hidden
                                }
                              })
                            }}/>
                          }
                          {
                            item.key !== 'basicInfo' && <DragHandle />
                          }
                        </Space>
                      </Row>
                    })
                  }
                </SortableContext>
              </DndContext>
              }
            </Tabs.TabPane>
          })
        }
      </Tabs>
    </div>
  )
}
