import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import * as momentTimezones from "moment-timezone/data/packed/latest.json";
import { Card, Grid } from "@mui/joy";
import { useTranslation } from "react-i18next";
import { useSignInForm } from "./useSignInForm";
import Link from "../../components/v2/Link";
import Input from "../../components/v2/Input";
import PhoneInput from "../../components/v2/PhoneInput";
import Typography from "../../components/v2/Typography";
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
        <Grid container spacing={2}>
          <Grid xs={12}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <Link
              onClick={() => {
                if (showCode) {
                  onStepBack();
                } else {
                  router.back();
                }
              }}
              underline={false}
            >
              &lt;{" "}
              {showCode
                ? t("scenes.signInScene.changeLoginType", {
                    type: t(`general.${typeField.value}`),
                  })
                : t("general.back")}
            </Link>
            {showCode && (
              <Typography level="body-md">{usernameField.value}</Typography>
            )}
          </Grid>

          <Grid xs={12} justifyContent="center">
            <Typography level="h3">{t("scenes.signInScene.header")}</Typography>
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
                    label={t("scenes.signInScene.enterCode", {
                      type: typeField.value,
                    })}
                    hint={
                      delay ? (
                        t("scenes.signInScene.youCanResendDelay", {
                          seconds: delay,
                        })
                      ) : (
                        <>
                          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                          <Link
                            onClick={handleSubmit(true, 0)}
                            underline={false}
                          >
                            <Typography fontSize="sm" color="primary">
                              {t("scenes.signInScene.resendCode")}
                            </Typography>
                          </Link>
                        </>
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
                        label={t("scenes.signInScene.enterEmail")}
                        placeholder={t("scenes.signInScene.enterEmail")}
                      />
                    )}
                    {typeField.value === "phone" && (
                      <PhoneInput
                        {...usernameField}
                        label={t("scenes.signInScene.enterPhone")}
                        placeholder={t("scenes.signInScene.enterPhone")}
                      />
                    )}
                  </Grid>
                  {/* <Grid container justifyContent="flex-end"> */}
                  {/*  /!* eslint-disable-next-line jsx-a11y/anchor-is-valid *!/ */}
                  {/*  <Link onClick={changeType} underline={false} primary> */}
                  {/*    {t("scenes.signInScene.useType", { */}
                  {/*      type: t( */}
                  {/*        `general.${ */}
                  {/*          typeField.value === "email" ? "phone" : "email" */}
                  {/*        }` */}
                  {/*      ), */}
                  {/*    })} */}
                  {/*  </Link> */}
                  {/* </Grid> */}
                </>
              )}

              <Grid container justifyContent="flex-end">
                <SubmitButton submitting={form.formState.isSubmitting}>
                  {t("scenes.signInScene.signInAction")}
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
