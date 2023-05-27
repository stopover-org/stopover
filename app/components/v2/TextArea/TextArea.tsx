import {
  FormHelperText,
  FormLabel,
  Textarea as JoyTextArea,
  TextareaProps as JoyTextAreaProps,
  Typography,
} from "@mui/joy";
import React from "react";

interface BaseTextAreaProps {
  onChange: (
    value: string,
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
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

    return (
      <>
        {label && <FormLabel>{label}</FormLabel>}
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
              {error}
            </Typography>
          </FormHelperText>
        )}
      </>
    );
  }
);

export default React.memo(TextArea);
