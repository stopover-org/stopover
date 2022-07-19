import styled from 'styled-components';
import Main from '../components/EventFilter';
import Layout from '../components/Layout';

const Container = styled.div`
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
