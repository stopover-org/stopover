import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import * as momentTimezones from "moment-timezone/data/packed/latest.json";
import { Card, Grid } from "@mui/joy";
import { useSignInForm } from "./useSignInForm";
import { getCountryFromOffset } from "../../lib/utils/timezones";
import Input from "../../components/v1/Input";
import Link from "../../components/v1/Link";
import Typography from "../../components/v1/Typography";
import { TypographySize } from "../../components/StatesEnum";
import PhoneInput from "../../components/v1/PhoneInput/PhoneInput";
import Button from "../../components/v1/Button";

// @ts-ignore
if (typeof window !== "undefined") window.momentTimezones = momentTimezones;

export const SignIn = () => {
  const router = useRouter();
  const [showCode, setShowCode] = useState(false);
  const { useFormField, resetField, handleSubmit } = useSignInForm(
    () => setShowCode(true),
    () => {}
  );
  const typeField = useFormField("type");
  const usernameField = useFormField("username");
  const codeField = useFormField("code");
  const country = React.useMemo(() => getCountryFromOffset(), []);
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
      <Card variant="outlined" sx={{ width: 500, "--Card-radius": "2px" }}>
        <Grid container>
          <Grid xs={12}>
            <Link onClick={() => router.back()}>
              <Typography underline>&lt; Back</Typography>
            </Link>
          </Grid>
          <Grid xs={12} container justifyContent="center">
            <Typography size={TypographySize.H3}>Sign In / Sign Up</Typography>
          </Grid>
          <Grid xs={12}>
            <form style={{ width: "100%" }} onSubmit={handleSubmit()}>
              {showCode && (
                <Grid>
                  <Input {...codeField} label="Enter Code" />
                </Grid>
              )}

              {!showCode && (
                <>
                  <Grid>
                    {typeField.value === "email" && (
                      <Input {...usernameField} label="Enter email" />
                    )}
                    {typeField.value === "phone" && (
                      <PhoneInput
                        {...usernameField}
                        country={country}
                        label="Enter phone number"
                      />
                    )}
                  </Grid>
                  <Grid container justifyContent="flex-end">
                    <Link onClick={changeType}>
                      <Typography size={TypographySize.SMALL}>
                        Use{" "}
                        {typeField.value === "email" ? "phone number" : "email"}
                      </Typography>
                    </Link>
                  </Grid>
                </>
              )}

              <Grid container justifyContent="flex-end">
                <Button type="submit">
                  <Typography color="white" size={TypographySize.BIG}>
                    Sign in
                  </Typography>
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default React.memo(SignIn);
