import type { NextPage } from 'next';
import Main from '../components/EventFilter/Index';
import Layout from '../components/Layout';
import DropDownList from "../components/EventFilter/DropDownList"

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  border: 1px solid black;
`;

const Home: NextPage = () => {
  return (
    <DropDownList>
      <input />
    </DropDownList>
  )
}

export default Home

/*
<Container>
      <Layout>
        <Main />
      </Layout>
    </Container>
*/
