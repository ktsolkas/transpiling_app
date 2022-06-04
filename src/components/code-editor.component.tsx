import "./code-editor.component.css";
import { useRef } from "react";
import MonacoEditor, { OnMount } from "@monaco-editor/react";
import prettier from "prettier";
import parser from "prettier/parser-babel";
import traverse from "@babel/traverse";
import { parse } from "@babel/parser";
import MonacoJSXHighlighter from "monaco-jsx-highlighter";
import { JSXTypes } from "monaco-jsx-highlighter";

interface EditorProps {
  initialValue: string;
  onChange: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ initialValue, onChange }) => {
  const editorRef = useRef<any>();

  const onEditorMount: OnMount = (editor, monaco) => {
    editor.onDidChangeModelContent((e) => {
      onChange(editor.getValue());
    });
    editor.getModel()?.updateOptions({ tabSize: 2 });
    editorRef.current = editor;
    const monacoJSXHighlighter = new MonacoJSXHighlighter(
      monaco,
      parse,
      traverse,
      editor
    );
    // Activate highlighting (debounceTime default: 100ms)
    monacoJSXHighlighter.highlightOnDidChangeModelContent(100);
    // Activate JSX commenting
    monacoJSXHighlighter.addJSXCommentCommand();
    JSXTypes.JSXText.options.inlineClassName = "jsxText";
    JSXTypes.JSXIdentifier.options.inlineClassName = "jsxIdentifier";
    JSXTypes.JSXBracket.options.inlineClassName = "jsxBracket";
  };

  const onFormat = () => {
    console.log("xD", editorRef.current.getValue());
    const preFormatValue = editorRef.current.getValue();
    const formatted = prettier
      .format(preFormatValue, {
        parser: "babel",
        plugins: [parser],
        useTabs: false,
        semi: true,
        singleQuote: true,
      })
      .replace(/\n$/, "");
    editorRef.current.setValue(formatted);
  };
  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormat}
      >
        Format
      </button>
      <MonacoEditor
        value={initialValue}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          lineNumbersMinChars: 3,
          fontSize: 20,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
        theme="vs-dark"
        language="javascript"
        height="100%"
        onMount={onEditorMount}
      />
    </div>
  );
};

export default Editor;
