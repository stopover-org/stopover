import { useMemo } from "react";
import { graphql } from "react-relay";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import { UseFormReturn } from "react-hook-form/dist/types";
import { UseMutationConfig } from "react-relay/relay-hooks/useMutation";
import { Disposable } from "relay-runtime";
import {
  SignInInput,
  useSignInForm_AuthLoginMutation,
} from "./__generated__/useSignInForm_AuthLoginMutation.graphql";
import useMutationForm from "../../lib/hooks/useMutationForm";

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

export function useSignInForm(onNextStep: (delay: number) => void) {
  const router = useRouter();

  function onSubmit(
    authLogin: (
      config: UseMutationConfig<useSignInForm_AuthLoginMutation>
    ) => Disposable,
    form: UseFormReturn<SignInFields>,
    resetCode: boolean = false,
    step: number = 0
  ) {
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
            router.push("/events");
          }
        },
      });
    };
  }

  return useMutationForm<SignInFields, useSignInForm_AuthLoginMutation>(
    graphql`
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
    `,
    (input: SignInFields) => ({
      input,
    }),
    {
      resolver: yupResolver(validationSchema),
      defaultValues: useDefaultValues(),
      onSubmit,
    }
  );
}
