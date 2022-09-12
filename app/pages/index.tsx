const Home = () => null;

export const getServerSideProps = async () => ({
  redirect: {
    destination: "/events",
    permanent: true,
  },
});

export default Home;
