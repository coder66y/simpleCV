import React from 'react';

import 'quill/dist/quill.snow.css';
import './index.less';
import Editor, { type IQuillEditorProps } from './editor';
export interface IEditorProps extends IQuillEditorProps {
  value?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}
/** 编辑器 */
const QuillEditor = (props: IEditorProps) => {
  const { value, readOnly = false, onChange, ...rest } = props;
  const toolbarOptions = [
    [{ indent: '-1' }, { indent: '+1' }],
    [{ align: [] }],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    ['bold', 'italic', 'underline', 'link'],
    [{ color: [] }, { background: [] }],
  ];
  return (
    <Editor
      theme="snow"
      {...rest}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      modules={{
        toolbar: readOnly ? false : toolbarOptions,
      }}
      className={`quill-editor ${rest.className ?? ''}`}
    />
  );
};

export default QuillEditor;
