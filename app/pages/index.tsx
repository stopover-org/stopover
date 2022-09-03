const Home = () => {
  return null
};

export const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/events',
      permanent: true,
    },
  }
}

export default Home
