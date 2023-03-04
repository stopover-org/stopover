import React from "react";
import { useRouter } from "next/router";
import { Form, Formik } from "formik";
import Card from "../../components/v2/Card";
import Column from "../../components/Layout/Column";
import Row from "../../components/Layout/Row";
import Typography from "../../components/v2/Typography";
import { TypographySize } from "../../components/StatesEnum";
import { useSignInForm } from "./useSignInForm";
import Input from "../../components/v2/Input";

export const SignIn = () => {
  const router = useRouter();
  const form = useSignInForm();

  return (
    <Column container alignItems="center" justifyContent="center">
      <Card width="500px" height="275px">
        <Column width="100%">
          <Row>
            <button type="button" onClick={() => router.back()}>
              <Typography>back</Typography>
            </button>
          </Row>
          <Row>
            <Typography size={TypographySize.H3}>Sign In / Sign Up</Typography>
          </Row>
          <Row>
            <Formik {...form}>
              <Form>
                <Input name="code" />
              </Form>
            </Formik>
          </Row>
        </Column>
      </Card>
    </Column>
  );
};

export default React.memo(SignIn);
