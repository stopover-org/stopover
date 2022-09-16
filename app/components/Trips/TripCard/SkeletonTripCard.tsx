import React from "react";
import styled from "styled-components";
import Column from "../../Column";
import Row from "../../Row";
import Skeleton from "../../Skeleton";
import Card from "../../Card";

const Wrapper = styled.div``;

const Content = styled(Column)`
  padding: 10px;
`;

const SkeletonOnboardingCard = () => (
  <Wrapper>
    <Card
      width="400px"
      content={
        <Content
          justifyContent="center"
          alignItems="center"
          width="60%"
          height="130px"
        >
          <Row justifyContent="start" alignItems="start">
            <Skeleton width="185px" height="100%" />
          </Row>
          <Row justifyContent="start" alignItems="end">
            <Skeleton width="178px" height="14px" />
          </Row>

          <Row justifyContent="space-between" alignItems="end">
            <>
              <Skeleton width="51px" height="14px" />
              <Skeleton width="100px" height="14px" />
            </>
          </Row>
        </Content>
      }
      image={<Skeleton width="40%" height="130px" />}
    />
  </Wrapper>
);

export default SkeletonOnboardingCard;
