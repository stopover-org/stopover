import { useMemo } from "react";
import { graphql, useMutation } from "react-relay";
import { useFormik } from "formik";
import * as Yup from "yup";
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
  username: Yup.string().required(),
  code: Yup.string(),
  type: Yup.mixed().oneOf(["email", "phone"]).required(),
});

export function useSignInForm() {
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
  const initialValues = useDefaultValues();
  return {
    initialValues,
    validationSchema,
    onSubmit,
  };
}
