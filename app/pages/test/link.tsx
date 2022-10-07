import React from "react";
import Layout from "../../components/MainPage/Layout";
import LinkComponent from "../../components/Link";
import Typography from "../../components/Typography";

const Link = () => (
  <Layout>
    <LinkComponent href="#">
      <Typography>this is link</Typography>
    </LinkComponent>
  </Layout>
);

export default Link;
