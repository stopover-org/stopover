import React, { useMemo } from "react";
import { graphql, useMutation } from "react-relay";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSignInForm_AuthLoginMutation } from "./__generated__/useSignInForm_AuthLoginMutation.graphql";

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

export const useSignInForm = (
  onNextStep: (delay: number) => void,
  onFinalStep: () => void
) => {
  const [authLogin] = useMutation<useSignInForm_AuthLoginMutation>(graphql`
    mutation useSignInForm_AuthLoginMutation($input: SignInInput!) {
      signIn(input: $input) {
        user {
          id
          email
          phone
        }
        delay
      }
    }
  `);

  function onSubmit({ code, ...values }: SignInFields) {
    const optional: Partial<SignInFields> = {};
    if (code) optional.code = code;
    authLogin({
      variables: {
        input: {
          ...values,
          ...optional,
        },
      },
      onCompleted(result) {
        if (result.signIn?.delay) {
          onNextStep(result.signIn?.delay);
        } else if (result.signIn?.user?.id) {
          onFinalStep();
        }
      },
    });
  }

  const form = useForm<SignInFields>({
    resolver: yupResolver(validationSchema),
    defaultValues: useDefaultValues(),
  });

  return React.useMemo(
    () => ({
      ...form,
      handleSubmit: () => form.handleSubmit(onSubmit),
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
