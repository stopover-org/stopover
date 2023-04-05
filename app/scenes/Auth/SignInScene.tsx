import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import * as momentTimezones from "moment-timezone/data/packed/latest.json";
import { Card, Grid } from "@mui/joy";
import { useSignInForm } from "./useSignInForm";
import Link from "../../components/v1/Link";
import Input from "../../components/v2/Input";
import PhoneInput from "../../components/v2/PhoneInput";
import Typography from "../../components/v2/Typography";
import Button from "../../components/v2/Button";

// @ts-ignore
if (typeof window !== "undefined") window.momentTimezones = momentTimezones;

export const SignIn = () => {
  const router = useRouter();
  const [showCode, setShowCode] = useState(false);
  const [delay, setDelay] = useState<number | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const decreaseDelay = (value: number) => {
    if (value === 0) {
      setDelay(null);
      return;
    }

    setDelay(value);

    timeoutRef.current = setTimeout(() => decreaseDelay(value - 1), 1000);
  };

  const { useFormField, resetField, handleSubmit } = useSignInForm(
    (leftSeconds: number) => {
      setShowCode(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      decreaseDelay(leftSeconds);
    },
    () => {
      console.log('router')
      router.push("/events");
    }
  );
  const typeField = useFormField("type");
  const usernameField = useFormField("username");
  const codeField = useFormField("code");
  const changeType = useCallback(() => {
    typeField.onChange(typeField.value === "email" ? "phone" : "email");

    resetField("username");
  }, [typeField.value, typeField.onChange]);

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      sx={{ flexGrow: 1, paddingTop: "50px" }}
    >
      <Card variant="outlined" sx={{ width: 500 }}>
        <Grid container>
          <Grid xs={12}>
            <Link onClick={() => router.back()}>
              <Typography underline>
                &lt; {showCode ? `Change ${typeField.value}` : "Back"}
              </Typography>
            </Link>
          </Grid>
          <Grid xs={12} container justifyContent="center">
            <Typography level="h3">Sign In / Sign Up</Typography>
          </Grid>
          <Grid xs={12}>
            <form style={{ width: "100%" }} onSubmit={handleSubmit()}>
              {showCode && (
                <Grid>
                  <Input
                    {...codeField}
                    label={`Enter Code from ${typeField.value}`}
                    hint={
                      delay ? (
                        `You can resend code in ${delay} seconds`
                      ) : (
                        <Link onClick={handleSubmit}>
                          <Typography fontSize="sm" color="primary">
                            Resend Code
                          </Typography>
                        </Link>
                      )
                    }
                  />
                </Grid>
              )}

              {!showCode && (
                <>
                  <Grid>
                    {typeField.value === "email" && (
                      <Input
                        {...usernameField}
                        label="Enter email"
                        placeholder="Enter your email"
                      />
                    )}
                    {typeField.value === "phone" && (
                      <PhoneInput
                        {...usernameField}
                        label="Enter phone number"
                      />
                    )}
                  </Grid>
                  <Grid container justifyContent="flex-end">
                    <Link onClick={changeType}>
                      <Typography fontSize="sm" color="primary">
                        Use{" "}
                        {typeField.value === "email" ? "phone number" : "email"}
                      </Typography>
                    </Link>
                  </Grid>
                </>
              )}

              <Grid container justifyContent="flex-end">
                <Button type="submit">Sign in</Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default React.memo(SignIn);
