import React from "react";
import { DropzoneOptions, useDropzone } from "react-dropzone";
import { Properties } from "csstype";

interface BaseFileUploaderProps {
  onChange: (files: string[]) => void;
}

interface FileUploaderProps
  extends Omit<DropzoneOptions, keyof BaseFileUploaderProps>,
    BaseFileUploaderProps {}

const baseStyle: Partial<Properties<string | number, string & {}>> = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "20px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const focusedStyle: Partial<Properties<string | number, string & {}>> = {
  borderColor: "#2196f3",
};

const acceptStyle: Partial<Properties<string | number, string & {}>> = {
  borderColor: "#00e676",
};

const rejectStyle: Partial<Properties<string | number, string & {}>> = {
  borderColor: "#ff1744",
};

function getBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = function onLoad() {
      resolve(reader.result as string);
    };

    reader.onerror = function onError(error) {
      reject(error);
    };
  });
}

const FileUploader = ({ onChange, onDrop, ...props }: FileUploaderProps) => {
  const customOnDrop = React.useCallback(
    async (acceptedFiles: any) => {
      const base64Strings: string[] = await Promise.all(
        [...acceptedFiles].map(getBase64)
      );

      onChange(base64Strings);
    },
    [onChange]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({ onDrop: onDrop || customOnDrop, ...props });

  const style = React.useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="container">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag n drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export default React.memo(FileUploader);
