import React from 'react';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import 'react-quill/dist/quill.snow.css'
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
      console.info(`%c info arg: %o`, 'color: green; font-size: 20px; font-weight: 700', arg)
    }}
    readOnly={readOnly}
    modules={{
      toolbar: readOnly ? false : toolbarOptions
    }}
    className='ql-editor'
    {...rest}
  />
}

export default Editor;