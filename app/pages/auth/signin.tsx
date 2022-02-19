import {useTranslation} from "react-i18next";
import React from "react";
import {Button, Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import styled from "styled-components";

const SRow = styled(Row)`
  padding: 5px 0;
`

const Signin = () => {
  const { t } = useTranslation();
  const [type, setType] = React.useState('phone')
  const [value, setValue] = React.useState("")
  return (
    <Container as={Form}>
      <SRow>
        <Col md={6}>
          <FloatingLabel label={t("signin.enterPhone")}>
            <Form.Control
              type="text"
              placeholder="+7(___)___-__-__"
              value={value}
              onChange={(ev) => setValue(ev.target.value)}
            />
          </FloatingLabel>
        </Col>
      </SRow>
      <SRow>
        <Col md={6}>
          <Button>{t("signin.submit")}</Button>
        </Col>
      </SRow>
    </Container>
    )
}

export default Signin