import type { NextPage } from 'next';
import Main from '../components/EventFilter/Main';
import Header from '../components/EventFilter/Header';

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;

const Layout = styled.div`
  width: 1600px;
  border: 1px solid red;
`;


const Home: NextPage = () => {
  return (
    <Container>
      <Layout>
        <Header />
        <Main />
      </Layout>
    </Container>
  )
}

export default Home
