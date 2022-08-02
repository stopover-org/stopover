import styled from "styled-components";
import React from "react";
import Layout from "../components/Layout";
import EventsList from "../components/Events/List";

const Container = styled.div`
  height: 100vh;
  display: flex;
  //justify-content: center;
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
