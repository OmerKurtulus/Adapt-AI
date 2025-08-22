import React from 'react';
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange?: (value: string) => void;
  className?: string;
  language: string;
}

function CodeEditor({ value, onChange, className = '', language }: CodeEditorProps) {
  const handleEditorChange = (value: string | undefined) => {
    if (onChange && value !== undefined) {
      onChange(value);
    }
  };

  return (
    <div className={`overflow-hidden rounded-lg border border-gray-700 ${className}`}>
      <Editor
        height="100%"
        defaultLanguage={language}
        value={value}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 8, bottom: 8 },
          readOnly: !onChange,
          domReadOnly: !onChange,
          lineNumbers: 'on',
          renderLineHighlight: 'all',
          highlightActiveIndentGuide: true,
          renderIndentGuides: true,
          contextmenu: true,
          wordWrap: 'on',
          scrollbar: {
            vertical: 'visible',
            horizontal: 'visible',
            useShadows: false,
            verticalScrollbarSize: 10,
            horizontalScrollbarSize: 10
          }
        }}
      />
    </div>
  );
}

export default CodeEditor;