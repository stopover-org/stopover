import {useTranslation} from "react-i18next";
import React from "react";
import styled from "styled-components";
import Head from "next/head";
import {Box, Button, Flex, Input, Label, Text} from 'theme-ui'
import {SIGN_IN_MUTATION} from "../../graphql/signIn";
import {useMutation} from "@apollo/client";
import {SignInTypesEnum} from "../../generated-types";
import Validation from "../../components/validationField";

const RightAligned = styled(Box)`
  text-align: right;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

const SForm = styled.form`
  margin: 180px auto 0 auto;
  display: flex;
  justify-content: center;
`

type ConfirmationFormProps = {
  error: { message: string }
}

type UsernameFormProps = {
  error: { message: string };
  onSubmit: (ev: React.FormEvent) => void;
  type: string;
  username: string;
  setUsername: (string) => void;
  switchType: (type: string) => void
}

const UsernameForm = ({ error, onSubmit, type, username, setUsername, switchType }: UsernameFormProps) => {
  const { t } = useTranslation();
  return (
    <SForm onSubmit={onSubmit}>
      <Flex
        sx={{
          flexWrap: 'wrap',
          width: '500px',
          justifyContent: 'center',
        }}
      >
        <Box sx={{width: ["100%"]}} mb={2}>
          <Flex sx={{
            flexWrap: "wrap"
          }}>
            <Box sx={{width: ["100%"]}} mb={error ? 0 : 2}>
              <Label>
                <Text sx={{variant: 'styles.h4'}}>
                  {type === 'phone' ? t("signIn.enterPhone") : t("signIn.enterEmail")}
                </Text>
              </Label>
            </Box>
            <Box sx={{width: ["100%"]}}>
              <Input
                type="text"
                placeholder={type === 'phone' ? "+7(___)___-__-__" : "Enter email"}
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                required
              />
              {error && <Validation>
                {error?.message}
              </Validation>}
            </Box>
          </Flex>
        </Box>
        <Box mt={3} sx={{width: ["50%"]}}>
          <Button variant="primary" disabled={!username} p={["12px 30px"]}>{t("signIn.submit")}</Button>
        </Box>
        <RightAligned sx={{width: ["50%"]}}>
          {type === 'email' && <Text sx={{variant: "styles.a"}} md={3} onClick={() => switchType('phone')}>
            {t("signIn.switchToPhone")}
          </Text>}
          {type === 'phone' && <Text sx={{variant: "styles.a"}} md={3} onClick={() => switchType('email')}>
            {t("signIn.switchToEmail")}
          </Text>}
        </RightAligned>
      </Flex>
    </SForm>
  )
}

const CodeConfirmation = ({ error, changeCode }: ConfirmationFormProps) => {
  const { t } = useTranslation();
  const [code, setCode] = React.useState([])
  const onChangeCode = (index: number) => async (ev) => {
    await setCode([...code.slice(0, index), ev.target.value[0], ...code.slice(index + 1)])
    if (index !== 4 && ev.target.value) {
      inputs[index + 1].current.focus()
    }
    changeCode(code.join(''))
  }
  const inputs = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null)
  ]

  return <SForm>
    <Flex
      sx={{
        flexWrap: 'wrap',
        width: '500px',
        justifyContent: 'center',
      }}
    >
      <Box sx={{width: ["100%"]}} mb={2}>
        <Flex sx={{
          flexWrap: "wrap"
        }}>
          <Box sx={{width: ["100%"]}} mb={error ? 0 : 2}>
            <Label>
              {t("signIn.codeLabel")}
            </Label>
            <Flex>
              <Box sx={{width: ["150px"], height: ["150px"], fontSize: 35}} mr={2}>
                <Input ref={inputs[0]} sx={{textAlign: "center"}} onChange={onChangeCode(0)} value={code[0]} />
              </Box>
              <Box sx={{width: ["150px"], height: ["150px"], fontSize: 35}} mr={2}>
                <Input ref={inputs[1]} sx={{textAlign: "center"}} onChange={onChangeCode(1)} value={code[1]} />
              </Box>
              <Box sx={{width: ["150px"], height: ["150px"], fontSize: 35}} mr={2}>
                <Input ref={inputs[2]} sx={{textAlign: "center"}} onChange={onChangeCode(2)} value={code[2]} />
              </Box>
              <Box sx={{width: ["150px"], height: ["150px"], fontSize: 35}} mr={2}>
                <Input ref={inputs[3]} sx={{textAlign: "center"}} onChange={onChangeCode(3)} value={code[3]} />
              </Box>
              <Box sx={{width: ["150px"], height: ["150px"], fontSize: 35}} mr={2}>
                <Input ref={inputs[4]} sx={{textAlign: "center"}} onChange={onChangeCode(4)} value={code[4]} />
              </Box>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </Flex>
  </SForm>
}

const SignIn = () => {
  const [type, setType] = React.useState('phone')
  const [value, setValue] = React.useState("")
  const [step, setStep] = React.useState(0)
  const [code, setCode] = React.useState('');
  const switchType = (val: string) => {
    setType(val)
    setValue("")
  }

  const onSubmitUsername = async (ev) => {
    try {
      ev.preventDefault();
      await signIn({
        variables: {
          input: {
            username: value,
            type: type as SignInTypesEnum,
          }
        }
      } as any)
      await setStep(1)
    } catch (err) {}
  }

  const [signIn, { data, loading, error }] = useMutation(SIGN_IN_MUTATION);

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      {step === 0 && <UsernameForm
          error={error}
          onSubmit={onSubmitUsername}
          type={type}
          username={value}
          setUsername={setValue}
          switchType={switchType}
      />}
      {step === 1 && <CodeConfirmation error={error} changeCode={setCode} />}
    </>
  )
}

export default SignIn