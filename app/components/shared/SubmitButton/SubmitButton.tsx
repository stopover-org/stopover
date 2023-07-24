import React from "react";
import { CircularProgress, IconButton } from "@mui/joy";
import Button from "../../v2/Button";
import { ButtonProps as OriginButtonProps } from "../../v2/Button/Button";

interface BaseButtonProps {
  submitting: boolean;
  icon?: boolean;
}

export interface ButtonProps
  extends Omit<OriginButtonProps, keyof BaseButtonProps>,
    BaseButtonProps {}

const SubmitButton = React.forwardRef(
  (
    { type: _type, submitting, icon = false, children, ...props }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    if (icon) {
      return (
        <IconButton
          ref={ref}
          type="submit"
          loading={submitting}
          disabled={submitting}
          sx={{ marginRight: "5px", marginLeft: "5px" }}
          {...props}
        >
          {submitting ? (
            <CircularProgress color={props.color} size="sm" />
          ) : (
            children
          )}
        </IconButton>
      );
    }
    return (
      <Button
        ref={ref}
        type="submit"
        loading={submitting}
        loadingPosition="end"
        disabled={submitting}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

export default React.memo(SubmitButton);
