import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";

const Button = styled.button`
  width: 190px;
  height: 70px;
  background-color: #ff8a00;
  font-weight: 400;
  font-size: 24px;
  line-height: 29px;
  border: none;
  cursor: pointer;
`;
const Wrapper = styled.div``;
const BreadCrums = styled.div`
  border: 1px solid red;
  height: 107px;
`;
const EventInformationShort = styled.div`
  border: 1px solid black;
  height: 145px;
`;
const GalleryPhoto = styled.div`
  border: 1px solid red;
  height: 665px;
`;
const EventInformation = styled.div`
  border: 1px solid black;
  display: flex;
  flex-direction: row;
`;
const Check = styled.div`
  width: 544px;
  height: 500px;
  background-color: #c2e0fe;
`;
const Information = styled.div`
  width: 963px;
  height: 734px;
  border: 1px solid red;
`;

function Events() {
  const router = useRouter();
  const { id, date } = router.query;
  return (
    <Wrapper>
      <Layout>
        <div>
          my id = {id}
          <BreadCrums>{"Home>Events>ChooseEvent>Event"}</BreadCrums>
          <EventInformationShort>
            name, rating, #<Button>{date}</Button>
            <Button>buy me</Button>
          </EventInformationShort>
          <GalleryPhoto>this is photo</GalleryPhoto>
          <EventInformation>
            <Information />
            <Check />
          </EventInformation>
        </div>
      </Layout>
    </Wrapper>
  );
}

export default React.memo(Events);
