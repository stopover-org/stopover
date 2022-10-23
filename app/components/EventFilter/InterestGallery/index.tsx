import React, { Suspense, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { graphql, useFragment } from "react-relay";
import ItemGallery from "./ItemGallery";
import ButtonGallery from "./ButtonGallery";
import { InterestGallery_InterestsFragment$key } from "./__generated__/InterestGallery_InterestsFragment.graphql";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 1000px;
  height: 180px;
`;

const CarouselContainer = styled.div`
  width: inherit;
  height: inherit;
  overflow: hidden;
  position: absolute;
`;

const Carousel = styled.div<{ width: number; moveTo: number | string }>`
  height: inherit;
  width: ${(props) => props.width}px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: relative;
  left: ${(props) => props.moveTo}px;
  transition: left 1s ease;
`;

type Props = {
  onChange: (interests: string[]) => void;
  interestsRef: InterestGallery_InterestsFragment$key;
};

const InterestGallery = ({ onChange, interestsRef }: Props) => {
  const [slideDirection, setSlideDirection] = useState(0);
  const [rightSlideEndPoint, setRightSlideEndPoint] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const imageWidth = 155;
  const carouselRef = useRef<HTMLDivElement>(null);
  const data = useFragment(
    graphql`
      fragment InterestGallery_InterestsFragment on Query {
        interests {
          id
          ...ItemGallery_InterestFragment
        }
      }
    `,
    interestsRef
  );

  const [carouselWidth, setCarouselWidth] = useState(
    (data?.interests?.length || 0) * imageWidth
  );

  useEffect(() => {
    if (carouselRef.current) {
      setRightSlideEndPoint(carouselRef.current.clientWidth - carouselWidth);
    }
  }, []);

  useEffect(() => {
    setCarouselWidth((data?.interests?.length || 0) * imageWidth);
  }, [data?.interests]);

  const onClickSlide = (direction: string) => {
    if (slideDirection < 0 && direction === "left") {
      setSlideDirection(slideDirection + imageWidth);

      return;
    }
    if (slideDirection >= rightSlideEndPoint && direction === "right") {
      setSlideDirection(slideDirection - imageWidth);
    }
  };

  const onClick = (id: string) => {
    let _selected: string[] = [];
    if (!selected.includes(id)) {
      _selected = [...selected, id];
    } else {
      _selected = [
        ...selected.slice(
          0,
          selected.findIndex((item) => item === id)
        ),
        ...selected.slice(
          selected.findIndex((item) => item === id) + 1,
          selected.length
        ),
      ];
    }
    setSelected(_selected);

    onChange(selected);
  };

  return (
    <Wrapper>
      <ButtonGallery buttonDirection="left" onClick={onClickSlide} />
      <CarouselContainer ref={carouselRef}>
        <Carousel moveTo={slideDirection} width={carouselWidth}>
          <Suspense>
            {data.interests!.map((interest) => (
              <ItemGallery
                key={interest.id}
                chosen={selected.includes(interest.id)}
                onClick={onClick}
                interestRef={interest}
              />
            ))}
          </Suspense>
        </Carousel>
      </CarouselContainer>
      <ButtonGallery buttonDirection="right" onClick={onClickSlide} />
    </Wrapper>
  );
};

export default React.memo(InterestGallery);
