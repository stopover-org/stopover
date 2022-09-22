import React from "react";
import styled from "styled-components";
import Column from "../../Column";
import Row from "../../Row";
import Skeleton from "../../Skeleton";
import Card from "../../Card";
import SkeletonImage from "../../icons/SkeletonImage.svg";
import { SkeletonType } from "../../StatesEnum";

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
            <Skeleton type={SkeletonType.BLOCK} width="185px" height="100%" />
          </Row>
          <Row justifyContent="start" alignItems="end">
            <Skeleton type={SkeletonType.BLOCK} width="178px" height="14px" />
          </Row>
          <Row justifyContent="space-between" alignItems="end">
            <>
              <Skeleton type={SkeletonType.BLOCK} width="51px" height="14px" />
              <Skeleton type={SkeletonType.BLOCK} width="100px" height="14px" />
            </>
          </Row>
        </Content>
      }
      image={
        <Skeleton
          type={SkeletonType.IMAGE}
          image={SkeletonImage.src}
          imageWidth="230px"
          imageHeight="230px"
          right="5px"
          top="-30px"
          width="40%"
          height="130px"
        />
      }
    />
  </Wrapper>
);

export default SkeletonOnboardingCard;
