import React from "react";
import styled from "styled-components";
import Card from "../Card";
import Skeleton from "../Skeleton";
import { SkeletonType, CardImageLocation } from "../StatesEnum";
import icon from "../icons/SkeletonImage.svg";
import Column from "../Column";
import Row from "../Row";

const SColumn = styled(Column)`
  padding: 25px;
  width: 60%;
`;

const SRow = styled(Row)`
  padding-top: 5px;
  padding-bottom: 5px;
`;

const SSkeleton = styled(Skeleton)`
  margin-right: 5px;
`;

const CardImageLeftSkeleton = () => (
  <Card
    width="1060px"
    height="440px"
    imageLocation={CardImageLocation.LEFT}
    content={
      <SColumn justifyContent="start" height="100%">
        <SRow justifyContent="start">
          <SSkeleton type={SkeletonType.BLOCK} width="247px" height="27px" />
        </SRow>
        <SRow justifyContent="start">
          <SSkeleton type={SkeletonType.BLOCK} width="130px" height="19px" />
          <SSkeleton type={SkeletonType.BLOCK} width="120px" height="19px" />
        </SRow>
        <SRow justifyContent="start" alignItems="end">
          <SSkeleton type={SkeletonType.BLOCK} width="140px" height="24px" />
        </SRow>
        <SRow justifyContent="start">
          <SSkeleton type={SkeletonType.BLOCK} width="100px" height="28px" />
          <SSkeleton type={SkeletonType.BLOCK} width="100px" height="28px" />
          <SSkeleton type={SkeletonType.BLOCK} width="100px" height="28px" />
        </SRow>
        <SRow justifyContent="start">
          <SSkeleton type={SkeletonType.BLOCK} width="560px" height="195px" />
        </SRow>
        <SRow justifyContent="end">
          <SSkeleton type={SkeletonType.BLOCK} width="68px" height="50px" />
          <SSkeleton type={SkeletonType.BLOCK} width="100px" height="50px" />
        </SRow>
      </SColumn>
    }
    image={
      <Skeleton
        type={SkeletonType.IMAGE}
        width="40%"
        height="100%"
        imageWidth="440px"
        imageHeight="570px"
        image={icon.src}
      />
    }
  />
);

export default CardImageLeftSkeleton;
/*
<Skeleton
                                type={SkeletonType.BLOCK}
                                width="60%"
                                height="440px"
                            />
                            */