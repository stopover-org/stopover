import React from "react";
import Layout from "../../components/MainPage/Layout";
import Acardion from "../../components/Acardion";
import Typography from "../../components/Typography";
import { TypographySize, TypographyTags } from "../../components/StatesEnum";
import Column from "../../components/Column";

const Test = () => (
  <Layout>
    <Acardion
      opened
      header={
        <Typography size={TypographySize.H1} as={TypographyTags.H1}>
          hi
        </Typography>
      }
      content={
        <Typography size={TypographySize.H1} as={TypographyTags.H1}>
          <Column>some content</Column>
        </Typography>
      }
    />
  </Layout>
);

export default Test;
