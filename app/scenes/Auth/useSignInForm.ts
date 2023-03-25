import React, { useMemo } from "react";
import { graphql, useMutation } from "react-relay";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSignInForm_AuthLoginMutation } from "./__generated__/useSignInForm_AuthLoginMutation.graphql";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

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
  username: Yup.string().required(),
  code: Yup.string(),
  type: Yup.mixed().oneOf(["email", "phone"]).required(),
});

export const useSignInForm = () => {
  const [authLogin] = useMutation<useSignInForm_AuthLoginMutation>(graphql`
    mutation useSignInForm_AuthLoginMutation($input: SignInInput!) {
      signIn(input: $input) {
        user {
          email
          phone
        }
        delay
      }
    }
  `);

  function onSubmit(values: SignInFields) {
    authLogin({ variables: { input: values } });
  }

  const form =  useForm<SignInFields>({
    resolver: yupResolver(validationSchema),
    defaultValues: useDefaultValues(),
  })

  return React.useMemo(() => ({
    ...form,
    handleSubmit: () => form.handleSubmit(onSubmit),
    useFormField(name: keyof SignInFields) {
      const field = form.register(name)

      return React.useMemo(() => ({
        ...field,
        ref: field.ref,
        value: form.watch(name),
        onChange: (value: string) => {
          form.setValue('username', value)
        },
      }), [field])
    }
  }), [])
}
