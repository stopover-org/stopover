import type { NextPage } from "next";
import React from "react";
import Layout from "../components/MainPage/Layout";
import EventsList from "../components/Events/List";

const Home: NextPage = () => (
  <Layout>
    <EventsList />
  </Layout>
);

export const getServerSideProps = async () => ({ props: {} });

export default React.memo(Home);
