import type { NextPage } from "next";
import { useRouter } from "next/router";
import React from "react";

const Home: NextPage = () => {
  const router = useRouter();
  React.useEffect(() => {
    router.push("/auth/signin");
  });

  return null;
};

export default Home;
