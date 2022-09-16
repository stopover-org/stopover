import React from "react";
import styled from "styled-components";
import SkeletonTripCard from "./TripCard/SkeletonTripCard";
import SkeletonOnboardingCard from "./OnboardingCard/SkeletonOnboardingCard";

const Wrapper = styled.div``;

const Trips = () => (
  <Wrapper>
    <SkeletonTripCard />
    <SkeletonOnboardingCard />
  </Wrapper>
);

export default Trips;
