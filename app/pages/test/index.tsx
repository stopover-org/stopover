import React, { useState } from "react";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";
import Checkbox from "../../components/Checkbox";
import Typography from "../../components/Typography";
import { CheckboxSizes, CheckboxType } from "../../components/StatesEnum";

const Wrapper = styled.div`
  width: 200px;
`;

const Test = () => {
  const [value1, setValue1] = useState(false);
  const [value2, setValue2] = useState(false);
  return (
    <Layout>
      <Wrapper>
        <Checkbox
          type={CheckboxType.RADIO}
          size={CheckboxSizes.SMALL}
          checked={value1}
          disabled
          onClick={() => setValue1(!value1)}
        >
          <Typography>
            this is label. It is better then yours dsafsdf sad fdsaf this is
            label. It is better then yoursdsafsdfsadfdsaf
          </Typography>
        </Checkbox>
        <Checkbox
          size={CheckboxSizes.SMALL}
          checked={value2}
          animate
          onClick={() => setValue2(!value2)}
        >
          <Typography>this is label. It is better then yours</Typography>
        </Checkbox>
      </Wrapper>
    </Layout>
  );
};

export default Test;
