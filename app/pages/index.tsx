import styled from "styled-components";
import React from "react";
import Layout from "../components/Layout";
import EventsList from "../components/Events/List";

const Container = styled.div``;

function Home() {
  return (
    <Container>
      <Layout>
        <EventsList />
      </Layout>
    </Container>
  );
}

export default React.memo(Home);
