import React from "react";
import styled from "styled-components";
import Layout from "../../components/MainPage/Layout";
import CompactCard from "../../components/EventListCard/CompactCard";
import WideCard from "../../components/EventListCard/WideCard";

const Wrapper = styled.div``;
const Cards = () => (
  <Layout>
    <Wrapper>
      <CompactCard
        averageRate={1.23}
        currency="$"
        price={600}
        image="https://images.theconversation.com/files/315915/original/file-20200218-11023-1k78m5f.jpg?ixlib=rb-1.1.0&rect=53%2C0%2C3425%2C1712&q=45&auto=format&w=1356&h=668&fit=crop"
        title="Welcome to marc"
        links={[
          {
            text: "first link",
            href: "../pages/test/tags_test",
          },
          {
            text: "second link",
            href: "../pages/test/tags_test",
          },
        ]}
        text="Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industrys standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum. rvived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of rvived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of
            rvived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of rvived not only five
            centuries, but also the leap into electronic typesetting, remaining
            essentially unchanged. It was popularised in the 1960s with the
            release of Letraset sheets containing Lorem Ipsum passages, and more
            recently with desktop publishing software like Aldus PageMaker
            including versions of rvived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
            It was popularised in the 1960s with the release of Letraset sheets
            containing Lorem Ipsum passages, and more recently with desktop
            publishing software like Aldus PageMaker including versions of
            rvived not only five centuries, but also the leap into electronic
            typesetting, remaining essentially unchanged. It was popularised in
            the 1960s with the release of Letraset sheets containing Lorem Ipsum
            passages, and more recently with desktop publishing software like
            Aldus PageMaker including versions of"
      />
      <WideCard
        averageRate={4.5}
        currency="$"
        price={600}
        image="https://images.theconversation.com/files/315915/original/file-20200218-11023-1k78m5f.jpg?ixlib=rb-1.1.0&rect=53%2C0%2C3425%2C1712&q=45&auto=format&w=1356&h=668&fit=crop"
        title="Welcome to marc"
        links={[
          {
            text: "first link",
            href: "../pages/test/tags_test",
          },
          {
            text: "second link",
            href: "../pages/test/tags_test",
          },
        ]}
      />
    </Wrapper>
  </Layout>
);

export default Cards;
