import React from "react";
import styled from "styled-components";
import Card from "../Card";
import Skeleton from "../Skeleton";
import { SkeletonType, CardImageLocation } from "../StatesEnum";
import icon from "../icons/SkeletonImage.svg";
import Column from "../Column";
import Row from "../Row";

const TagList = styled(Column)`
  padding: 10px;
`;

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

const CardImageTopSkeleton = () => (
  <Card
    imageLocation={CardImageLocation.TOP}
    height="530px"
    width="330px"
    content={
      <SColumn>
        <SRow justifyContent="start">
          <SSkeleton type={SkeletonType.BLOCK} width="247px" height="29px" />
        </SRow>
        <SRow justifyContent="start">
          <SSkeleton type={SkeletonType.BLOCK} width="130px" height="19px" />
          <SSkeleton type={SkeletonType.BLOCK} width="90px" height="19px" />
        </SRow>
        <SRow justifyContent="start" alignItems="end">
          <SSkeleton type={SkeletonType.BLOCK} width="137px" height="25px" />
          <SSkeleton type={SkeletonType.BLOCK} width="100px" height="17px" />
        </SRow>
        <SRow justifyContent="start">
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

export default CardImageTopSkeleton;
