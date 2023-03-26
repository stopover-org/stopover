import React, {useCallback} from "react";
import {useRouter} from "next/router";
import Card from "../../components/v2/Card";
import Column from "../../components/Layout/Column";
import Row from "../../components/Layout/Row";
import Typography from "../../components/v2/Typography";
import {TypographySize} from "../../components/StatesEnum";
import {useSignInForm} from "./useSignInForm";
import Input from "../../components/v1/Input";
import Button from "../../components/v1/Button";
import Link from "../../components/v1/Link";

export const SignIn = () => {
  const router = useRouter();
  const form = useSignInForm();
  const typeField = form.useFormField('type')
  const changeType = useCallback(() => {
    typeField.onChange(typeField.value === 'email' ? 'phone' : 'email')
  }, [typeField.value, typeField.onChange])

  return (
    <Column container alignItems="center" justifyContent="center">
      <Card width="500px" height="275px" padding="20px 50px">
        <Column width="100%">
          <Row width="100%">
            <Link onClick={() => router.back()}>
              <Typography underline>&lt; Back</Typography>
            </Link>
          </Row>
          <Row width="100%" justifyContent="center" padding='0 0 40px 0'>
            <Typography size={TypographySize.H3}>Sign In / Sign Up</Typography>
          </Row>
          <Row width="100%">
            <form style={{ width: '100%' }} onSubmit={form.handleSubmit()}>
              <Input
                {...form.useFormField('username')}
                label={`Enter ${typeField.value === 'email' ? 'email' : 'phone number'}`}
              />
              <Row width="100%" justifyContent="flex-end">
                <Link onClick={changeType}>
                  <Typography size={TypographySize.SMALL}>
                    Use {typeField.value === 'email' ? 'phone number' : 'email'}
                  </Typography>
                </Link>
              </Row>

              <Row justifyContent="flex-end" width="100%" padding="20px 0 0 0">
                <Button type="submit">
                  <Typography color={'white'} size={TypographySize.BIG}>Sign in</Typography>
                </Button>
              </Row>
            </form>
          </Row>
        </Column>
      </Card>
    </Column>
  );
};

export default React.memo(SignIn);
