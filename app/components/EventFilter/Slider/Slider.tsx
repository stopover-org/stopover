import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import styled from "styled-components";
import moment, { Moment } from "moment";
import React from "react";
import { MarkObj } from "rc-slider/es/Marks";

const Wrapper = styled.div`
  .rc-slider {
    width: 380px;
  }
`;

type Props = {
  range: number[] | Moment[] | string[];
};

function SliderComponent({ range }: Props) {
  if (!range.find(Boolean)) return null;

  const checkType = () => {
    if (typeof range[0] !== typeof range[range.length - 1]) {
      console.log("types of start and end are different");
      return false;
    }
    if (
      typeof range[0] === "number" &&
      typeof range[range.length - 1] === "number"
    ) {
      if (range[0] <= range[range.length - 1]) {
        console.log("number");
        return true;
      }
      console.log("its a number but first arg < argEnd");
      return false;
    }
    // range[0] instanceof moment
    if (
      range[0] instanceof moment &&
      range[range.length - 1] instanceof moment
    ) {
      if (
        (range[0] as Moment).isValid() &&
        (range[range.length - 1] as Moment).isValid()
      ) {
        console.log("date");
        return true;
      }
      console.log("its an object but not moment");
      return false;
    }

    return true;
  };

  if (!checkType()) {
    return (
      <Wrapper>
        <Slider range />
      </Wrapper>
    );
  }

  const nameType = () => {
    if (
      typeof range[0] === "number" &&
      typeof range[range.length - 1] === "number"
    ) {
      return "number";
    }
    if (
      range[0] instanceof moment &&
      range[range.length - 1] instanceof moment
    ) {
      return "date";
    }
    if (
      typeof range[0] === "string" &&
      typeof range[range.length - 1] === "string"
    ) {
      return "string";
    }
    console.log("function nameType didnt find correct type");
    return null;
  };

  const createMarksNumber = (delta: number, startPoint: number) => {
    const array = new Array(delta + 1).fill(null) as MarkObj[];
    return array.reduce((marks: Record<string, MarkObj>, item, index) => {
      marks[index] = { label: startPoint + index };
      return marks;
    }, {} as Record<string, MarkObj>);
  };

  const createMarksDate = (delta: number, startPoint: Moment) => {
    const cloneDateStartDate = startPoint!.clone();
    const array = new Array(delta).fill(null) as MarkObj[];
    let flagIndex = 0;

    return array.reduce((marks: Record<string, MarkObj>, item, index) => {
      if (index === flagIndex) {
        flagIndex += 1;
        marks[index] = { label: cloneDateStartDate.format("DD.MM") };
      }
      if (delta - 1 === index) {
        marks[index] = { label: cloneDateStartDate.format("DD.MM") };
      }
      cloneDateStartDate.add(1, "days");

      return marks;
    }, {} as Record<string, MarkObj>);
  };

  const createMarksString = (delta: number) => {
    const array = new Array(delta).fill(null) as MarkObj[];
    return array.reduce((marks: Record<string, MarkObj>, item, index) => {
      marks[index] = { label: range[index] as string };
      return marks;
    }, {} as Record<string, MarkObj>);
  };

  const findDelta = () => {
    switch (nameType()) {
      case "number":
        return (range[range.length - 1] as number) - (range[0] as number);
      case "date":
        return Math.abs(
          Math.ceil(
            (range[0] as Moment).diff(range[range.length - 1], "days") - 1
          )
        );
      case "string":
        return range.length;
      default:
        console.log(checkType());
        return 1;
    }
  };

  const createMarks = (): Record<string, MarkObj> => {
    // if(findDelta() === null) return null;
    switch (nameType()) {
      case "number":
        return createMarksNumber(findDelta(), range[0] as number);
      case "date":
        return createMarksDate(findDelta(), range[0] as Moment);
      case "string":
        return createMarksString(findDelta());
      default:
        console.log(checkType());
        return {};
    }
  };

  return (
    <Wrapper>
      <Slider
        range
        allowCross={false}
        count={1}
        max={findDelta()}
        min={0}
        marks={createMarks()}
      />
    </Wrapper>
  );
}
export default SliderComponent;

/*

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

*/
