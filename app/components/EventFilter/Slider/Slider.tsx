import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import styled from "styled-components";
import { Moment } from "moment";
import React, { useEffect, useState } from "react";
import { MarkObj } from "rc-slider/es/Marks";

const Wrapper = styled.div<{ display: string }>`
  .rc-slider {
    width: 380px;
  }
  .rc-slider-handle {
    display: ${(props) => props.display};
  }
`;

type Props = {
  fromDate?: Moment;
  toDate?: Moment;
  countOfElements: number;
};

function SliderComponent(props: Props) {
  const deltaDays = Math.abs(
    Math.ceil(
      props.fromDate ? props.fromDate.diff(props.toDate, "days") - 1 : 0
    )
  );
  const stepHandler = (countOfElements: number) =>
    Math.round(deltaDays / countOfElements);

  const [sliderPoints, setSliderPoints] = useState<Record<string, MarkObj>>({
    0: { label: "" },
  });

  const createMarks = () => {
    if (!props.fromDate || !props.fromDate!.isValid()) {
      return {};
    }

    const cloneDate = props.fromDate.clone();
    const array = new Array(deltaDays).fill(null) as MarkObj[];

    let flagIndex = 0;
    const step = stepHandler(props.countOfElements - 1);
    return array.reduce((marks: Record<string, MarkObj>, item, index) => {
      if (index === flagIndex) {
        flagIndex += step;
        marks[index] = { label: cloneDate.format("DD.MM") };
      }
      if (deltaDays - 1 === index) {
        marks[index] = { label: cloneDate.format("DD.MM") };
      }
      cloneDate.add(1, "days");

      return marks;
    }, {} as Record<string, MarkObj>);
  };

  useEffect(() => {
    setSliderPoints(createMarks());
  }, [deltaDays, props.countOfElements]);

  if (!props.fromDate?.isValid() || !props.toDate?.isValid()) {
    return (
      <Wrapper display="none">
        <Slider range />
      </Wrapper>
    );
  }

  return (
    <Wrapper display="block">
      <Slider
        range
        allowCross={false}
        count={1}
        max={deltaDays - 1}
        min={0}
        marks={sliderPoints}
      />
    </Wrapper>
  );
}
export default SliderComponent;
