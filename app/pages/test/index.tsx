import React from "react";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";
import Input from "../../components/Input";
import Typography from "../../components/Typography";
import {
  InputSizes,
  InputVariants,
  IconPosition,
} from "../../components/StatesEnum";
import MagnifineGlass from "../../components/icons/Outline/Interface/Zoom-in.svg";

const SInput = styled.div`
  width: 180px;
`;

const Test = () => (
  <Layout>
    <SInput>
      <Input
        size={InputSizes.MEDIUM}
        icon={MagnifineGlass.src}
        iconPosition={IconPosition.RIGHT}
        inputVariants={InputVariants.COMMON}
        placeholder="Placeholder"
        errorMessage={
          <Typography fontWeight="400" color="#BE0000">
            You have some error
          </Typography>
        }
        hint={
          <Typography fontWeight="400">
            this is message to you, idiot. its is big. really really big. o my
            god i does not work as intendeed
          </Typography>
        }
        label={<Typography fontWeight="400">The best input</Typography>}
      />
    </SInput>
  </Layout>
);
export default Test;
