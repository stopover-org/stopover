import React from "react";
import { PickerOverlay } from "filestack-react";
import { PickerOptions } from "filestack-js";
import { useTranslation } from "react-i18next";
import Button from "../Button";

interface BaseFileUploaderProps {
  onChange: (files: string[]) => void;
  pickerOptions?: PickerOptions;
}

interface FileUploaderProps extends BaseFileUploaderProps {}

const FileUploader = ({ onChange, pickerOptions }: FileUploaderProps) => {
  const filestackApiKey = process.env.NEXT_PUBLIC_FILESTACK_API_KEY || "";
  const [opened, setOpened] = React.useState(false);
  const { t } = useTranslation();
  return (
    <>
      <Button
        size="sm"
        onClick={() => setOpened(!opened)}
        sx={{ marginBottom: "20px" }}
      >
        {t("forms.editFirm.attachImage")}
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
