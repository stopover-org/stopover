import {useTranslation} from "react-i18next";
import React from "react";
import styled from "styled-components";
import Head from "next/head";
import {Box, Button, Flex, Input, Label, Text} from 'theme-ui'

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

const SignIn = () => {
  const { t } = useTranslation();
  const [type, setType] = React.useState('phone')
  const [value, setValue] = React.useState("")
  const switchType = (val: string) => {
    setType(val)
    setValue("")
  }
  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <SForm>
        <Flex
          sx={{
            flexWrap: 'wrap',
            width: '400px',
            justifyContent: 'center',
          }}
        >
          <Box sx={{width: ["100%"]}} mb={2}>
            <Flex sx={{
              flexWrap: "wrap"
            }}>
              <Box sx={{width: ["100%"]}} mb={2}>
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
                  value={value}
                  onChange={(ev) => setValue(ev.target.value)}
                  required
                />
              </Box>
            </Flex>
          </Box>
          <Box mt={3} sx={{width: ["50%"]}}>
            <Button variant="primary" disabled={!value} p={["12px 30px"]}>{t("signIn.submit")}</Button>
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
    </>
  )
}

export default SignIn