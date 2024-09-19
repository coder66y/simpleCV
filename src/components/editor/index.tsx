import React, { ForwardedRef, forwardRef, useEffect, useLayoutEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
export interface IEditorProps {
  readOnly?: boolean;
  defaultValue?: any;
  onTextChange?: (...args: any[]) => void;
  onSelectionChange?: (...args: any[]) => void;
}

const Editor = () => {
  const [value, setvalue] = useState('')
  const options = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ 'header': [1,2,3,4,5,6,false] }],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],
      [{ 'indent': '-1' }, { 'indent': '+1' }],
    ]
  }
  return <ReactQuill
    theme="snow" 
    value={value}
    onChange={(...arg) => {
      console.info(`%c info arg: %o`, 'color: green; font-size: 20px; font-weight: 700', arg)
    }}
    modules={options}
    className='ql-editor'
  />
}

export default Editor;