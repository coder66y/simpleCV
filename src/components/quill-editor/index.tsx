import React from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import './index.less'
export interface IEditorProps extends ReactQuillProps {
}

/** 编辑器 */
const Editor = (props: IEditorProps) => {
  const { value, readOnly, onChange, ...rest } = props;
  const  toolbarOptions = [
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'align': [] }],
    [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
    ['bold', 'italic', 'underline', 'link'],
    [{ 'color': [] }, { 'background': [] }],
  ]
  return <ReactQuill
    theme="snow"
    value={value}
    onChange={(...arg) => {
      // 非用户操作，不触发更改
      if(arg[2] !== 'user') return;
      onChange?.(...arg)
    }}
    readOnly={readOnly}
    modules={{
      toolbar: readOnly ? false : toolbarOptions
    }}
    className='quill-editor'
    {...rest}
  />
}

export default Editor;