import type { NextPage } from 'next';
import Main from '../components/EventFilter';
import Layout from '../components/Layout';
import MetaBall from "../components/EventFilter/MetaBall/MetaBall";


import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  align-items: center;
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
/*



      */