import React from "react";
import styled from "styled-components";
import Column from "../../Layout/Column";
import Row from "../../Layout/Row";
import Skeleton from "../../v1/Skeleton";
import Card from "../../v1/Card";

const Wrapper = styled.div``;
const Content = styled(Column)`
  padding: 10px;
`;

const SkeletonOnboardingCard = () => (
  <Wrapper>
    <Card
      width="850px"
      content={
        <Content
          justifyContent="center"
          alignItems="center"
          width="60%"
          height="333px"
        >
          <>
            <Row justifyContent="start" alignItems="flex-start">
              <Skeleton width="160px" height="32px" />
            </Row>
            <Row>
              <Skeleton width="480px" height="210px" />
            </Row>
            <Row justifyContent="end" alignItems="flex-end">
              <Skeleton width="190px" height="33px" />
            </Row>
          </>
        </Content>
      }
      image={<Skeleton width="40%" height="339px" />}
      rightToLeft
    />
  </Wrapper>
);

export default SkeletonOnboardingCard;
