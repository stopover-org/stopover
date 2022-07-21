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
  startDate: Moment | null;
  endDate: Moment | null;
  countOfElements: number;
  sliderHandler: (chosenStart: string, chosenEnd: string) => void;
};

function SliderComponent(props: Props) {
  const canCreateMarks = props.startDate && props.endDate && props.startDate?.isValid() && props.endDate?.isValid();
  const deltaDays = Math.abs(
    Math.ceil(
      props.startDate ? props.startDate.diff(props.endDate, "days") - 1 : 0
    )
  );
  const stepHandler = (countOfElements: number) =>
    Math.round(deltaDays / countOfElements);

  const [sliderPoints, setSliderPoints] = useState<Record<string, MarkObj>>({
    0: { label: "" },
  });
  
  const createMarks = (step: number) => {
    
    if (!canCreateMarks) {
      return {};
    }

    const cloneDate = props.startDate!.clone();
    const array = new Array(deltaDays).fill(null) as MarkObj[];

    let flagIndex = 0;
    //const step = stepHandler(props.countOfElements - 1);
    
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
    
    if(canCreateMarks){setSliderPoints(createMarks(stepHandler(props.countOfElements - 1)))}

  }, [deltaDays, props.countOfElements, canCreateMarks]);

  if (!canCreateMarks) {
    return (
      <Wrapper display="none">
        <Slider range />
      </Wrapper>
    );
  }

  const chosenValue = (index: number) => {
    return createMarks(1)[index].label;
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
        onChange={(...args: number[][])=>{
          props.sliderHandler(
            chosenValue(args[0][0]),
            chosenValue(args[0][1])
          )}}
      />
    </Wrapper>
  );
}
export default SliderComponent;
