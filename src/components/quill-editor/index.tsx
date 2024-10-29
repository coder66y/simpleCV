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
    [{ 'header': [1,2,3,false] }],
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