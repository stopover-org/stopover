import type { NextPage } from 'next';
import Main from '../components/EventFilter/Index';
import Layout from '../components/Layout';
import DropDownList from "../components/EventFilter/DropDownList"

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
