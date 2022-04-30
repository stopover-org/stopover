import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Head from "next/head";
import { Box, Button, Flex, Input, Label, Link, Text } from "theme-ui";
import { SIGN_IN_MUTATION } from "../../graphql/signIn";
import { useMutation } from "@apollo/client";
import { SignInTypesEnum } from "../../generated-types";
import Validation from "../../components/validationField";

const RightAligned = styled(Box)`
  text-align: right;
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const SForm = styled.form`
  margin: 180px auto 0 auto;
  display: flex;
  justify-content: center;
`;

type ConfirmationFormProps = {
  error: string;
  resendCode: () => void;
  resetStep: () => void;
  delay: number;
  switchType: () => void;
  type: string;
  switchStep: () => void;
};

type UsernameFormProps = {
  error: string;
  onSubmit: () => void;
  type: string;
  username: string;
  setUsername: () => void;
  switchType: () => void;
};

const UsernameForm = ({
  error,
  onSubmit,
  type,
  username,
  setUsername,
  switchType,
}: UsernameFormProps) => {
  const { t } = useTranslation();
  return (
    <SForm onSubmit={onSubmit}>
      <Flex
        sx={{
          flexWrap: "wrap",
          width: "500px",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: ["100%"] }}>
          <Label mb={2}>
            <Text sx={{ variant: "styles.h4" }}>
              {type === "phone"
                ? t("signIn.enterPhone")
                : t("signIn.enterEmail")}
            </Text>
          </Label>
        </Box>
        <Box sx={{ width: ["100%"] }} mb={error ? 0 : 2}>
          <Input
            type="text"
            placeholder={type === "phone" ? "+7(___)___-__-__" : "Enter email"}
            value={username}
            onChange={(ev) => setUsername(ev.target.value)}
            required
          />
        </Box>
        {error && (
          <Box sx={{ width: ["100%"] }} mb={2}>
            <Validation>{error}</Validation>
          </Box>
        )}
        <Box mt={3} sx={{ width: ["50%"] }}>
          <Button variant="primary" disabled={!username} p={["12px 30px"]}>
            {t("signIn.submit")}
          </Button>
        </Box>
        <RightAligned sx={{ width: ["50%"] }}>
          {type === "email" && (
            <Text
              sx={{ variant: "styles.a" }}
              md={3}
              onClick={() => switchType("phone")}
            >
              {t("signIn.switchToPhone")}
            </Text>
          )}
          {type === "phone" && (
            <Text
              sx={{ variant: "styles.a" }}
              md={3}
              onClick={() => switchType("email")}
            >
              {t("signIn.switchToEmail")}
            </Text>
          )}
        </RightAligned>
      </Flex>
    </SForm>
  );
};

const CodeConfirmation = ({
  error,
  delay,
  changeCode,
  type,
  switchType,
  resetStep,
  resendCode,
}: ConfirmationFormProps) => {
  const { t } = useTranslation();
  const [code, setCode] = React.useState([]);
  const getCode = (index: number, value: string) => [
    ...code.slice(0, index),
    value[0],
    ...code.slice(index + 1),
  ];
  const onChangeCode = (index: number) => async (ev) => {
    await setCode(getCode(index, ev.target.value));

    if (index !== 4 && ev.target.value) {
      inputs[index + 1].current.focus();
    }

    changeCode(getCode(index, ev.target.value).join(""));
  };

  const inputs = [
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
    React.useRef(null),
  ];

  return (
    <SForm>
      <Flex
        sx={{
          flexWrap: "wrap",
          width: "500px",
          justifyContent: "center",
        }}
      >
        <Box sx={{ width: ["100%"] }} mb={error ? 0 : 2}>
          <Label mb={2}>
            <Text sx={{ variant: "styles.h4" }}>{t("signIn.codeLabel")}</Text>
          </Label>

          <Flex mb={2}>
            <Box
              sx={{ width: ["100px"], height: ["90px"], fontSize: 35 }}
              mr={2}
            >
              <Input
                ref={inputs[0]}
                sx={{ textAlign: "center", height: "100%" }}
                onChange={onChangeCode(0)}
                value={code[0]}
              />
            </Box>
            <Box
              sx={{ width: ["100px"], height: ["90px"], fontSize: 35 }}
              mr={2}
            >
              <Input
                ref={inputs[1]}
                sx={{ textAlign: "center", height: "100%" }}
                onChange={onChangeCode(1)}
                value={code[1]}
              />
            </Box>
            <Box
              sx={{ width: ["100px"], height: ["90px"], fontSize: 35 }}
              mr={2}
            >
              <Input
                ref={inputs[2]}
                sx={{ textAlign: "center", height: "100%" }}
                onChange={onChangeCode(2)}
                value={code[2]}
              />
            </Box>
            <Box
              sx={{ width: ["100px"], height: ["90px"], fontSize: 35 }}
              mr={2}
            >
              <Input
                ref={inputs[3]}
                sx={{ textAlign: "center", height: "100%" }}
                onChange={onChangeCode(3)}
                value={code[3]}
              />
            </Box>
            <Box sx={{ width: ["100px"], height: ["90px"], fontSize: 35 }}>
              <Input
                ref={inputs[4]}
                sx={{ textAlign: "center", height: "100%" }}
                onChange={onChangeCode(4)}
                value={code[4]}
              />
            </Box>
          </Flex>
          {error && (
            <Box sx={{ width: ["100%"] }} mb={2}>
              <Validation>{error}</Validation>
            </Box>
          )}
          <Box sx={{ width: ["50%"] }} mb={2}>
            {type === "email" && (
              <Text
                sx={{ variant: "styles.a" }}
                onClick={() => switchType("phone")}
              >
                {t("signIn.switchToPhone")}
              </Text>
            )}
            {type === "phone" && (
              <Text
                sx={{ variant: "styles.a" }}
                onClick={() => switchType("email")}
              >
                {t("signIn.switchToEmail")}
              </Text>
            )}
          </Box>

          <Box sx={{ width: ["50%"] }} mb={2}>
            <Text sx={{ variant: "styles.a" }} onClick={() => resetStep()}>
              {type === "phone"
                ? t("signIn.changePhone")
                : t("signIn.changeEmail")}
            </Text>
          </Box>
          <Box sx={{ width: ["50%"] }} mb={2}>
            <Link
              sx={{ variant: "styles.a" }}
              onClick={() => resendCode()}
              disabled={delay > 0}
            >
              {t("signIn.resendCode")}
            </Link>
            <Text sx={{ variant: "styles.h5" }}>
              &nbsp;{delay > 0 && delay}
            </Text>
          </Box>
        </Box>
      </Flex>
    </SForm>
  );
};

const SignIn = () => {
  const { t } = useTranslation();
  const [signIn] = useMutation(SIGN_IN_MUTATION);
  const [type, setType] = React.useState("phone");
  const [value, setValue] = React.useState("");
  const [step, setStep] = React.useState(0);
  const [code, setCode] = React.useState("");
  const [error, setError] = React.useState(undefined);
  const [delay, setDelay] = React.useState(0);
  const switchType = (val: string) => {
    setType(val);
    setCode("");
    setValue("");
    setStep(0);
  };
  const resetStep = () => {
    switchType(type);
  };
  const setCodeHandler = async (val: string) => {
    setError(undefined);
    try {
      await setCode(val);
      if (val.length === 5) {
        await signIn({
          variables: {
            input: {
              username: value,
              type: type as SignInTypesEnum,
              code: val,
            },
          },
        } as any);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const onSubmitUsername = async (ev?: React.MouseEvent) => {
    setError(undefined);
    try {
      if (ev) {
        ev.preventDefault();
      }
      const result = await signIn({
        variables: {
          input: {
            username: value,
            type: type as SignInTypesEnum,
          },
        },
      } as any);
      setDelay(result?.data?.signIn?.delay);
      await setStep(1);
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => {
    const timeoutId = setInterval(() => {
      if (delay > 0) {
        setDelay(delay - 1);
      }
    }, 1000);
    return () => clearInterval(timeoutId);
  }, [delay]);

  return (
    <>
      <Head>
        <title>{t("signIn.title")}</title>
      </Head>
      {step === 0 && (
        <UsernameForm
          error={error}
          onSubmit={onSubmitUsername}
          type={type}
          username={value}
          setUsername={setValue}
          switchType={switchType}
        />
      )}
      {step === 1 && (
        <CodeConfirmation
          type={type}
          switchType={switchType}
          resetStep={resetStep}
          error={error}
          changeCode={setCodeHandler}
          resendCode={onSubmitUsername}
          delay={delay}
        />
      )}
    </>
  );
};

export default SignIn;
