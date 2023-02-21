import { useMemo } from "react";
import { graphql, useMutation } from "react-relay";
import { useFormik } from "formik";

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

export function useSignInForm() {
  const [authLogin] = useMutation(graphql`
    mutation useSignInForm_AuthLogin($input: SignInInput!) {
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
  return useFormik<SignInFields>({
    initialValues,
    onSubmit,
  });
}
