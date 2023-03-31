import React from "react";
import styled from "styled-components";
import Card from "../v1/Card";
import Skeleton from "../v1/Skeleton";
import { CardImageLocation, SkeletonType } from "../StatesEnum";
import icon from "../icons/SkeletonImage.svg";
import Column from "../Layout/Column";
import Row from "../Layout/Row";
import TagList from "./components/TagList";

const SColumn = styled(Column)`
  padding: 20px;
  height: 40%;
`;

const SSkeleton = styled(Skeleton)`
  margin-right: 10px;
`;

const STags = styled(Skeleton)`
  margin-bottom: 5px;
`;

const SRow = styled(Row)`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const WideCardSkeleton = () => (
  <Card
    imageLocation={CardImageLocation.TOP}
    height="530px"
    width="330px"
    content={
      <SColumn>
        <SRow container justifyContent="start">
          <SSkeleton type={SkeletonType.BLOCK} width="247px" height="29px" />
        </SRow>
        <SRow container justifyContent="start">
          <SSkeleton type={SkeletonType.BLOCK} width="130px" height="19px" />
          <SSkeleton type={SkeletonType.BLOCK} width="90px" height="19px" />
        </SRow>
        <SRow container justifyContent="start" alignItems="end">
          <SSkeleton type={SkeletonType.BLOCK} width="137px" height="25px" />
          <SSkeleton type={SkeletonType.BLOCK} width="100px" height="17px" />
        </SRow>
        <SRow container justifyContent="start">
          <SSkeleton type={SkeletonType.BLOCK} width="73px" height="34px" />
          <SSkeleton type={SkeletonType.BLOCK} width="68px" height="55px" />
        </SRow>
      </SColumn>
    }
    image={
      <Skeleton
        type={SkeletonType.IMAGE}
        width="330px"
        height="60%"
        imageWidth="330px"
        imageHeight="400px"
        image={icon.src}
      />
    }
  >
    <TagList alignItems="end">
      <STags type={SkeletonType.BLOCK} width="100px" height="30px" />
      <STags type={SkeletonType.BLOCK} width="160px" height="30px" />
    </TagList>
  </Card>
);

export default WideCardSkeleton;
