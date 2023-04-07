import React, { useMemo } from "react";
import { graphql, useMutation } from "react-relay";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useCookies } from "react-cookie";
import { useRouter } from "next/router";
import {
  SignInInput,
  useSignInForm_AuthLoginMutation,
} from "./__generated__/useSignInForm_AuthLoginMutation.graphql";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const __AUTH_COOKIE_NAME__ = "__stopover_session__";

interface SignInFields {
  username: string;
  code: string;
  type: "email" | "phone";
}

function useDefaultValues(): SignInFields {
  return useMemo(
    () => ({
      username: "",
      code: "",
      type: "email",
    }),
    []
  );
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required().nonNullable(),
  code: Yup.string(),
  type: Yup.mixed().oneOf(["email", "phone"]).required(),
});

export const useSignInForm = (onNextStep: (delay: number) => void) => {
  const [_, setCookies] = useCookies();
  const router = useRouter();
  const [authLogin] = useMutation<useSignInForm_AuthLoginMutation>(graphql`
    mutation useSignInForm_AuthLoginMutation($input: SignInInput!) {
      signIn(input: $input) {
        user {
          id
          email
          phone
        }
        accessToken
        delay
        reason
      }
    }
  `);

  const form = useForm<SignInFields & { general?: string }>({
    resolver: yupResolver(validationSchema),
    defaultValues: useDefaultValues(),
  });

  function onSubmit(resetCode: boolean = false, step: number = 0) {
    return function submit({ code, ...values }: SignInFields) {
      const optional: Partial<SignInInput> = { resetCode };
      if (step === 1) optional.code = code;
      authLogin({
        variables: {
          input: {
            ...values,
            ...optional,
          },
        },
        onCompleted(result) {
          if (result.signIn?.reason) {
            form.setError("code", { message: result.signIn?.reason });

            form.setError("username", { message: result.signIn?.reason });
            return;
          }

          if (result.signIn?.delay !== null) {
            onNextStep(result.signIn?.delay!);
          } else if (result.signIn?.user?.id) {
            setCookies(__AUTH_COOKIE_NAME__, result.signIn?.accessToken!);

            router.push("/events");
          }
        },
      });
    };
  }

  return React.useMemo(
    () => ({
      ...form,
      handleSubmit: (resendCode: boolean = false, step: number = 0) =>
        form.handleSubmit(onSubmit(resendCode, step)),
      useFormField(name: keyof SignInFields) {
        const field = form.register(name);

        return React.useMemo(
          () => ({
            ...field,
            ref: field.ref,
            value: form.watch(name),
            onChange: (value: string) => {
              form.setValue(name, value);
            },
            error: form.formState.errors[name]?.message,
          }),
          [field]
        );
      },
    }),
    []
  );
};
