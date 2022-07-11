import type { NextPage } from 'next';
import Main from '../components/EventFilter';
import Layout from '../components/Layout';

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Home: NextPage = () => {
  return (
    <Container>
      <Layout>
        <Main />
      </Layout>
    </Container>
  )
}

export default Home