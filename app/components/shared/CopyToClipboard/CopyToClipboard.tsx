import React from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { IconButton } from "@mui/joy";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

interface CopyToClipboardProps {
  text: string;
}

const CopyToClipboard = ({ text }: CopyToClipboardProps) => {
  const { t } = useTranslation();
  const onClick = React.useCallback(() => {
    navigator.clipboard.writeText(text).then(() => {
      toast.message(t("general.copied"));
    });
  }, [text]);

  return (
    <>
      {text}{" "}
      <IconButton onClick={onClick} size="sm">
        <ContentCopyIcon />
      </IconButton>
    </>
  );
};

export default React.memo(CopyToClipboard);
