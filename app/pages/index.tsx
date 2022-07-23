import styled from "styled-components";
import { graphql, loadQuery, usePreloadedQuery } from "react-relay";
import Main from "../components/EventFilter";
import Layout from "../components/Layout";
import Environment from "../lib/environment";

const Container = styled.div`
  height: 100vh;
  align-items: center;
`;

const Query = graphql`
  query pagesQuery {
    currentUser {
      id
    }
    events {
      id
      eventOptions {
        id
        relayId
      }
      interests {
        id
        title
      }
      achievements {
        title
      }
    }
  }
`;

const preloadedQuery = loadQuery(Environment, Query, {});

function Home() {
  usePreloadedQuery(Query, preloadedQuery);

  return (
    <Container>
      <Layout>
        <Main />
      </Layout>
    </Container>
  );
}

export default Home;
