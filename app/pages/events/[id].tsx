import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";
import BreadCrums from "../../components/EventCard/BreadCrums";
import DetailedInformation from "../../components/EventCard/DetailedInformation";
import MainInformation from "../../components/EventCard/MainInformation";
import GalleryOfPhotes from "../../components/EventCard/GalleryOfPhotes";
import Comments from "../../components/EventCard/Comments";

const Body = styled.div`
  padding: 30px;
`;

function Events() {
  const router = useRouter();
  const { date } = router.query;
  return (
    <Layout>
      <Body>
        <BreadCrums />
        <MainInformation date={date} />
        <GalleryOfPhotes />
        <DetailedInformation />
        <Comments />
      </Body>
    </Layout>
  );
}

export default React.memo(Events);
