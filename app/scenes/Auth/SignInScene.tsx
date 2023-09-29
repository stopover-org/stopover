import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import * as momentTimezones from "moment-timezone/data/packed/latest.json";
import { Card, Grid } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { useSignInForm } from "./useSignInForm";
import Link from "../../components/v1/Link";
import Input from "../../components/v2/Input";
import PhoneInput from "../../components/v2/PhoneInput";
import Typography from "../../components/v2/Typography";
import Button from "../../components/v2/Button";
import SubmitButton from "../../components/shared/SubmitButton";

// @ts-ignore
if (typeof window !== "undefined") window.momentTimezones = momentTimezones;

export const SignIn = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [showCode, setShowCode] = useState(false);
  const [delay, setDelay] = useState<number | null>(null);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const decreaseDelay = (value: number) => {
    if (value <= 0) {
      setDelay(null);
      return;
    }

    setDelay(value);

    timeoutRef.current = setTimeout(() => decreaseDelay(value - 1), 1000);
  };

  const { useFormField, resetField, handleSubmit, reset, ...form } =
    useSignInForm((leftSeconds: number) => {
      setShowCode(true);

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      decreaseDelay(leftSeconds);
    });
  const typeField = useFormField("type");
  const usernameField = useFormField("username");
  const codeField = useFormField("code");
  const changeType = useCallback(() => {
    typeField.onChange(typeField.value === "email" ? "phone" : "email");

    resetField("username");
  }, [typeField.value, typeField.onChange]);

  const onStepBack = () => {
    reset();

    setShowCode(false);

    setDelay(null);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

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
            <Link
              onClick={() => {
                if (showCode) {
                  onStepBack();
                } else {
                  router.back();
                }
              }}
            >
              <Typography underline>
                &lt; {showCode ? t('scenes.signIn.changeLoginType', {type: t(`general.${typeField.value}`)}) : t('general.back')}
              </Typography>
            </Link>
            {showCode && (
              <Typography level="body-md">{usernameField.value}</Typography>
            )}
          </Grid>

          <Grid xs={12} container justifyContent="center">
            <Typography level="h3">{t('scenes.signIn.header')}</Typography>
          </Grid>

          <Grid xs={12}>
            <form
              style={{ width: "100%" }}
              onSubmit={handleSubmit(false, showCode ? 1 : 0)}
            >
              {showCode && (
                <Grid>
                  <Input
                    {...codeField}
                    label={t('scenes.signIn.enterCode', {type: typeField.value})}
                    hint={
                      delay ? (
                        t('scenes.signIn.youCanResendDelay', { seconds: delay })
                      ) : (
                        <Link onClick={handleSubmit(true, 0)}>
                          <Typography fontSize="sm" color="primary">
                            {t('scenes.signIn.resendCode')
                            }
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
                        label={t('scenes.signIn.enterEmail')}
                        placeholder={t('scenes.signIn.enterEmail')}
                      />
                    )}
                    {typeField.value === "phone" && (
                      <PhoneInput
                        {...usernameField}
                        label={t('scenes.signIn.enterPhone')}
                        placeholder={t('scenes.signIn.enterPhone')}
                      />
                    )}
                  </Grid>
                  <Grid container justifyContent="flex-end">
                    <Link onClick={changeType}>
                      <Typography fontSize="sm" color="primary">
                      {t('scenes.signIn.useType', {type: t(`general.${typeField.value === 'email' ? 'phone' : 'email'}`)})}
                      </Typography>
                    </Link>
                  </Grid>
                </>
              )}

              <Grid container justifyContent="flex-end">
                <SubmitButton submitting={form.formState.isSubmitting}>
                  {t('scenes.signIn.signInAction')}
                </SubmitButton>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default React.memo(SignIn);
