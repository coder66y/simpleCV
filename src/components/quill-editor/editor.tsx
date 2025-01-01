import React, { useEffect, useRef } from "react";
import Quill, { Delta, Range, QuillOptions, EmitterSource } from "quill";
import ReactDOM from "react-dom";
import isEqual from "lodash.isequal";
export type Value = string;

export interface IQuillEditorProps extends QuillOptions {
  theme?: string;
  value?: Value;
  defaultValue?: Value;
  onChange?: (
    value: Value,
    delta: Delta,
    source: EmitterSource,
    editor: Quill
  ) => void;
  readOnly?: boolean;
  preserveWhitespace?: boolean;
  modules?: any;
  className?: string;
}
const Editor = (props: IQuillEditorProps) => {
  const {
    value,
    readOnly,
    defaultValue,
    className,
    onChange,
  } = props;
  let editingArea: React.ReactInstance | null = null;

  const editor = useRef<Quill>();
  const _selection = useRef<Range>(new Range(0, 0));
  const _value = useRef<Value>('');

  useEffect(() => {
    instantiateEditor()
    listenChange()
    return () => {
      unListenChange()
    }
  }, [])

  useEffect(() => {
    if (editor.current) {
      setEditorReadOnly(editor.current, readOnly || false);
    }
  }, [readOnly])

  useEffect(() => {
    const _value = value ?? defaultValue;
    if (editor.current && typeof _value === "string") {
      setEditorContents(editor.current, _value);
    }
  }, [value, defaultValue])

  const listenChange = () => {
    if (editor.current) {
      editor.current.on('editor-change', onEditorChange);
    }
  }

  const getEditorContents = (): Value  => {
    return _value.current;
  }

  const getEditorSelection = (): Range => {
    return _selection.current;
  }

  const isEqualValue = (value: any, nextValue: any): boolean => {
    return isEqual(value, nextValue);
  }

  const onEditorChangeText = (
    value: string,
    delta: Delta,
    source: EmitterSource,
    editor: Quill,
  ) => {
    if(isEqualValue(value, getEditorContents())) return;
    const htmlStr = editor.getSemanticHTML()
    _value.current = htmlStr;
    onChange?.(htmlStr, delta, source, editor)
  }

  const onEditorChangeSelection = (
    nextSelection: Range,
    source: EmitterSource,
    editor: Quill,
  ) => {
    if (!editor) return;
    const currentSelection = getEditorSelection();
    if (isEqual(nextSelection, currentSelection)) return;
    _selection.current = nextSelection;
  }

  const onEditorChange = (
    eventName: 'text-change' | 'selection-change',
    rangeOrDelta: Delta | Range,
    oldRangeOrDelta: Delta | Range,
    source: EmitterSource,
  ) => {
    if (eventName === 'text-change') {
      onEditorChangeText?.(
        editor.current!.root.innerHTML,
        rangeOrDelta as Delta,
        source,
        editor.current!
      );
    } else if (eventName === 'selection-change') {
      onEditorChangeSelection?.(
        rangeOrDelta as Range,
        source,
        editor.current!
      );
    }
  };

  const unListenChange = () => {
    if (editor.current) {
      editor.current.off('editor-change');
    }
  }

  const renderEditingArea = (): JSX.Element => {
    const {children, preserveWhitespace} = props;

    const properties = {
      ref: (instance: React.ReactInstance | null) => {
        editingArea = instance
      },
    };

    if (React.Children.count(children)) {
      return React.cloneElement(
        React.Children.only(children)!,
        properties
      );
    }

    return preserveWhitespace ?
      <pre {...properties}/> :
      <div {...properties}/>;
  }

  const instantiateEditor = () => {
    if(!editor.current) {
      createEditor(getEditingArea(), getEditorConfig());
    }
  }

  const createEditor = (element: HTMLElement, config: QuillOptions) => {
    editor.current = new Quill(element, config);
    return editor.current;
  }

  const getEditingArea = (): HTMLElement => {
    if (!editingArea) {
      throw new Error('Instantiating on missing editing area');
    }
    const element = ReactDOM.findDOMNode(editingArea);
    if (!element) {
      throw new Error('Cannot find element for editing area');
    }
    if (element.nodeType === 3) {
      throw new Error('Editing area cannot be a text node');
    }
    return element as HTMLElement;
  }

  const getEditorConfig = (): QuillOptions => {
    return {
      bounds: props.bounds,
      formats: props.formats,
      modules: props.modules,
      placeholder: props.placeholder,
      readOnly: props.readOnly,
      theme: props.theme,
    };
  }

  const setEditorReadOnly = (editor: Quill, value: boolean) => {
    if (value) {
      editor.disable();
    } else {
      editor.enable();
    }
  }

  const setEditorContents = (editor: Quill, value: string) => {
    if(value === getEditorContents()) return;
    const text = editor.clipboard.convert({
      html: value,
    });
    editor.setContents(text);
    const sel = getEditorSelection();
    requestAnimationFrame(() => {
      setEditorSelection(editor, sel)
    });
  }

  const setEditorSelection = (editor: Quill, range: Range) => {
    _selection.current = range;
    if (range) {
      editor.setSelection(range);
    }
  }

  return (
    <div className={className}>
      {renderEditingArea()}
    </div>
  )
}

export default Editor