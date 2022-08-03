import styled from "styled-components";
import React from "react";
import Layout from "../components/Layout";
import EventsList from "../components/Events/List";

const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  /*max-width: 1600px;
  margin: auto;*/
`;

function Home() {
  return (
    <Container className="text">
      <Layout>
        <EventsList />
      </Layout>
    </Container>
  );
}

export default React.memo(Home);
