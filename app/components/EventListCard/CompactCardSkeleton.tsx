import React from "react";
import styled from "styled-components";
import Card from "../Card";
import Skeleton from "../Skeleton";
import { CardImageLocation, SkeletonType } from "../StatesEnum";
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
  margin-right: 10px;
`;

const CompactCardSkeleton = () => (
  <Card
    width="1060px"
    height="440px"
    imageLocation={CardImageLocation.LEFT}
    content={
      <SColumn justifyContent="start" height="100%">
        <SRow container justifyContent="start">
          <SSkeleton type={SkeletonType.BLOCK} width="247px" height="27px" />
        </SRow>
        <SRow container justifyContent="start">
          <SSkeleton type={SkeletonType.BLOCK} width="130px" height="19px" />
          <SSkeleton type={SkeletonType.BLOCK} width="120px" height="19px" />
        </SRow>
        <SRow container justifyContent="start" alignItems="end">
          <SSkeleton type={SkeletonType.BLOCK} width="140px" height="24px" />
        </SRow>
        <SRow container justifyContent="start">
          <SSkeleton type={SkeletonType.BLOCK} width="100px" height="28px" />
          <SSkeleton type={SkeletonType.BLOCK} width="100px" height="28px" />
          <SSkeleton type={SkeletonType.BLOCK} width="100px" height="28px" />
        </SRow>
        <SRow container justifyContent="start">
          <SSkeleton type={SkeletonType.BLOCK} width="580px" height="195px" />
        </SRow>
        <SRow container justifyContent="end">
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

export default CompactCardSkeleton;
/*
<Skeleton
                                type={SkeletonType.BLOCK}
                                width="60%"
                                height="440px"
                            />
                            */
