import React from "react";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";
import CardImageLeft from "../../components/EventListCard/CardImageLeft";
import CardImageTop from "../../components/EventListCard/CardImageTop";
import icon from "../../components/icons/Outline/Brands/Chrome.svg";

const Wrapper = styled.div``;
const Cards = () => (
  <Layout>
    <Wrapper>
      <CardImageLeft
        rate={4.5}
        price={600}
        image="https://images.theconversation.com/files/315915/original/file-20200218-11023-1k78m5f.jpg?ixlib=rb-1.1.0&rect=53%2C0%2C3425%2C1712&q=45&auto=format&w=1356&h=668&fit=crop"
        title="Welcome to marc"
        links={["first link", "second link"]}
        tags={[
          {
            image: icon.src,
            content: "first tag",
          },
          {
            image: "",
            content: "second tag",
          },
        ]}
      />
      <CardImageTop
        rate={4.5}
        price={600}
        image="https://images.theconversation.com/files/315915/original/file-20200218-11023-1k78m5f.jpg?ixlib=rb-1.1.0&rect=53%2C0%2C3425%2C1712&q=45&auto=format&w=1356&h=668&fit=crop"
        title="Welcome to marc"
        links={["first link", "second link"]}
        tags={[
          {
            image: "",
            content: "first tag",
          },
          {
            image: "",
            content: "second tag",
          },
        ]}
      />
    </Wrapper>
  </Layout>
);

export default Cards;
