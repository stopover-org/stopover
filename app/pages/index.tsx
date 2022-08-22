import React from "react";
import Layout from "../components/MainPage/Layout";
import EventsList from "../components/Events/List";

function Home() {
  return (
    <Layout>
      <EventsList />
    </Layout>
  );
}

export default React.memo(Home);
