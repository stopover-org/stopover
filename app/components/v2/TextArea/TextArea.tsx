import {
  FormHelperText,
  FormLabel,
  Textarea as JoyTextArea,
  TextareaProps as JoyTextAreaProps,
  Typography,
} from "@mui/joy";
import React from "react";
import { FieldError } from "react-hook-form";

interface BaseTextAreaProps {
  onChange: (
    value: string,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: FieldError | string;
  value?: string;
  placeholder?: string;
}

interface TextAreaProps
  extends Omit<JoyTextAreaProps, keyof BaseTextAreaProps>,
    BaseTextAreaProps {}

const TextArea = React.forwardRef(
  (
    { onChange, label, hint, error, value, ...props }: TextAreaProps,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ref: React.Ref<HTMLDivElement>
  ) => {
    const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!(onChange instanceof Function)) return;
      onChange(event.target.value, event);
    };

    const errorMessage = React.useMemo(
      () => (typeof error === "string" ? error : error?.message),
      [error]
    );

    return (
      <>
        {label && <FormLabel sx={{ paddingBottom: "5px" }}>{label}</FormLabel>}
        <JoyTextArea
          onChange={onChangeHandler}
          value={value}
          error={Boolean(error)}
          {...props}
        />
        {hint && <FormHelperText>{hint}</FormHelperText>}
        {error && (
          <FormHelperText>
            <Typography fontSize="sm" color="danger">
              {errorMessage}
            </Typography>
          </FormHelperText>
        )}
      </>
    );
  }
);

export default React.memo(TextArea);
