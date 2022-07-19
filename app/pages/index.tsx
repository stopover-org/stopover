import styled from 'styled-components';
import Main from '../components/EventFilter';
import Layout from '../components/Layout';
import MetaBall from "../components/EventFilter/MetaBall/MetaBall";


const Container = styled.div`
  height: 100vh;
  align-items: center;
  display: flex;
  justify-content: center;
  
`;


function Home() {
  return (
    <Container>
      <Layout>
        <Main />
      </Layout>
    </Container>
  );
}

export default Home;
