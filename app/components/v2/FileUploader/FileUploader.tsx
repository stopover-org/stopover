import React from "react";
import { PickerOverlay } from "filestack-react";
import { PickerOptions } from "filestack-js";
import Button from "../Button";
import { useApiKey } from "../../../lib/hooks/useApiKey";

interface BaseFileUploaderProps {
  onChange: (files: string[]) => void;
  pickerOptions?: PickerOptions;
}

interface FileUploaderProps extends BaseFileUploaderProps {}

const FileUploader = ({ onChange, pickerOptions }: FileUploaderProps) => {
  const filestackApiKey = useApiKey("filestack")!;
  const [opened, setOpened] = React.useState(false);
  return (
    <>
      <Button onClick={() => setOpened(!opened)} sx={{ marginBottom: "20px" }}>
        Attach Image
      </Button>
      {opened && (
        <PickerOverlay
          apikey={filestackApiKey}
          pickerOptions={{
            ...pickerOptions,
            onClose: () => setOpened(false),
            onUploadDone: ({ filesUploaded }) =>
              onChange(filesUploaded.map(({ url }) => url)),
          }}
        />
      )}
    </>
  );
};

export default React.memo(FileUploader);
