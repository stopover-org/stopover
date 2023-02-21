import React from "react";
import { useRouter } from "next/router";
import Card from "../../components/Card";
import Column from "../../components/Column";
import Row from "../../components/Row";
import Typography from "../../components/Typography";
import { TypographySize } from "../../components/StatesEnum";
import { useSignInForm } from "./useSignInForm";

export const SignIn = () => {
  const router = useRouter();
  const form = useSignInForm();
  console.log(form);
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
            <Typography>form</Typography>
          </Row>
        </Column>
      </Card>
    </Column>
  );
};

export default React.memo(SignIn);
