import React from "react";
import "react-quill/dist/quill.snow.css";
import { Editor as TinymceEditor } from "@tinymce/tinymce-react";

interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export const EditorStyles = `
  h1 {
    font-size: 32px;
    font-weight: 600;
  }
  h2 {
    font-size: 28px;
    font-weight: 600;
  }
  h3 {
    font-size: 24px;
    font-weight: 500;
  }
  h4 {
    font-size: 18px;
    font-weight: 400;
  }
  h5 {
    font-size: 14px;
    font-weight: 400;
  }
  h6 {
    font-size: 12px;
    font-weight: 400;
  }
  pre {
    font-size: 12px;
    font-family: Monospace;
    font-weight: 300;
  }
`;

const Editor = ({ value, onChange, placeholder }: EditorProps) => (
  <TinymceEditor
    apiKey="hqlsvda7rj2nm0vtq7y28mg1zghcmvct4gjn2n95kc59y6jk"
    init={{
      menubar: false,
      plugins:
        "linkwordcount tinymcespellchecker autocorrect a11ychecker typography",
      toolbar: "blocks | bold italic underline strikethrough",
      placeholder,
      body_class: "tinymce-editor",
      content_style: `body { font-family: Roboto, sans-serif; font-weight: 300; white-space: pre-wrap; }${EditorStyles}`,
    }}
    onEditorChange={(_, editor) => {
      if (onChange instanceof Function) {
        console.log(editor.getContent({ format: "html" }));

        onChange(editor.getContent({ format: "html" }));
      }
    }}
    value={value}
  />
);

export default React.memo(Editor);
