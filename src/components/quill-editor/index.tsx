import React from 'react';
import 'quill/dist/quill.snow.css';
import './index.less';

import Editor, { Value } from './editor';
export interface IEditorProps {
  value?: string;
  readOnly?: boolean;
  onChange?: (value: string) => void;
}

/** 编辑器 */
const QuillEditor = (props: IEditorProps) => {
  const { value, readOnly = false, onChange } = props;
  const  toolbarOptions = [
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'align': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    ['bold', 'italic', 'underline', 'link'],
    [{ 'color': [] }, { 'background': [] }],
  ]  
  return <Editor
    theme="snow"
    value={value}
    onChange={(value: Value) => {
      onChange?.(value as string)
    }}
    readOnly={readOnly}
    modules={{
      toolbar: readOnly ? false : toolbarOptions
    }}
    className='quill-editor'
  />
}

export default QuillEditor;