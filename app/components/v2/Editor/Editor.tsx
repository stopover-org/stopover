import React from "react";
import { Editor as TinymceEditor } from "@tinymce/tinymce-react";
import { FormControl, FormHelperText, FormLabel, Typography } from "@mui/joy";

interface EditorProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  errorMessage?: string;
  withImagePlugin?: boolean;
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

const Editor = ({
  value,
  onChange,
  placeholder,
  label,
  errorMessage,
  withImagePlugin = false,
}: EditorProps) => {
  const apiKey = process.env.NEXT_PUBLIC_TINYMCE_API_KEY;
  const toolbar = React.useMemo(
    () =>
      `blocks | bold italic underline strikethrough${
        withImagePlugin ? " | image" : ""
      }`,
    [withImagePlugin]
  );

  const plugins = React.useMemo(
    () => `link wordcount${withImagePlugin ? " image" : ""}`,
    [withImagePlugin]
  );
  return (
    <FormControl>
      {label && <FormLabel>{label}</FormLabel>}
      <TinymceEditor
        apiKey={apiKey}
        init={{
          menubar: false,
          plugins,
          toolbar,
          placeholder,
          body_class: "tinymce-editor",
          content_style: `body { font-family: Roboto, sans-serif; font-weight: 300; white-space: pre-wrap; }${EditorStyles}`,
        }}
        onEditorChange={(_, editor) => {
          if (onChange instanceof Function) {
            onChange(editor.getContent({ format: "html" }));
          }
        }}
        value={value}
      />
      {errorMessage && (
        <FormHelperText>
          <Typography fontSize="sm" color="danger">
            {errorMessage}
          </Typography>
        </FormHelperText>
      )}
    </FormControl>
  );
};

export default React.memo(Editor);
