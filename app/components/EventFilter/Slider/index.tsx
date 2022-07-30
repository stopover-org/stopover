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
  .rc-slider-handle {
    background: #ff8a00;
    border: 2px solid #ffab49;
    height: 29px;
    width: 29px;
    top: -8px;
    opacity: 1;
  }
  .rc-slider-dot {
    //display: none;
    background: #cacaca;
    border: none;
    border-radius: 5px 5px 5px 5px;
    width: 3px;
    height: 15px;
    top: -5px;
  }
  .rc-slider-handle-dragging.rc-slider-handle-dragging.rc-slider-handle-dragging {
    border-color: #ffab49;
    box-shadow: 0 0 0 5px #ff8a00;
  }
  .rc-slider-track {
    background: #ff8a00;
    height: 15px;
    top: -6px;
  }
  .rc-slider-rail {
    background-color: #cacaca;
  }
`;

type Props = {
  range: number[] | Moment[] | string[];
  countOfMarks: number;
  onChange: (chosenStart: string, chosenEnd: string) => void;
};

function SliderComponent({ range, countOfMarks, onChange }: Props) {
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

  const createMarksNumber = (
    delta: number,
    startPoint: number,
    currentCountOfMarks: number
  ) => {
    const array = new Array(delta).fill(null) as MarkObj[];
    let flagIndex = 0;
    const countOfGaps = currentCountOfMarks - 1;
    const step = Math.round(delta / countOfGaps);

    return array.reduce((marks: Record<string, MarkObj>, item, index) => {
      if (flagIndex !== countOfGaps) {
        if (index === step * flagIndex) {
          marks[index] = { label: startPoint + index };
          flagIndex += 1;
        }
      }
      if (delta - 1 === index) {
        marks[index] = { label: startPoint + index };
      }
      return marks;
    }, {} as Record<string, MarkObj>);
  };

  const createMarksDate = (
    delta: number,
    startPoint: Moment,
    currentCountOfMarks: number
  ) => {
    const cloneDateStartDate = startPoint!.clone();
    const array = new Array(delta).fill(null) as MarkObj[];
    let flagIndex = 0;
    const countOfGaps = currentCountOfMarks - 1;
    const step = Math.round(delta / countOfGaps);

    return array.reduce((marks: Record<string, MarkObj>, item, index) => {
      if (flagIndex !== countOfGaps) {
        if (index === step * flagIndex) {
          marks[index] = { label: cloneDateStartDate.format("DD.MM") };
          flagIndex += 1;
        }
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
        return (range[range.length - 1] as number) - (range[0] as number) + 1;
      case "date":
        return (
          Math.abs(
            Math.ceil(
              (range[0] as Moment).diff(range[range.length - 1], "days")
            )
          ) + 1
        ); // one more magical 1. conroles count of output marks
      case "string":
        return range.length;
      default:
        console.log(checkType());
        return 1;
    }
  };

  const createMarks = (
    delta: number,
    startPoint: number | Moment | string,
    currentCountOfMarks: number
  ): Record<string, MarkObj> => {
    switch (nameType()) {
      case "number":
        return createMarksNumber(
          delta,
          startPoint as number,
          currentCountOfMarks
        );
      case "date":
        return createMarksDate(
          delta,
          startPoint as Moment,
          currentCountOfMarks
        );
      case "string":
        return createMarksString(delta);
      default:
        console.log(checkType());
        return {};
    }
  };

  const chosenValue = (index?: number) => {
    if (!index) return null;
    try {
      return createMarks(findDelta(), range[0], findDelta())[index].label;
    } catch {
      throw new Error("cant find choosen value in slider");
    }
  };

  return (
    <Wrapper>
      <Slider
        range
        allowCross={false}
        count={1}
        max={findDelta() - 1} // magic -1. i dont know why it works but it works.
        min={0}
        marks={createMarks(findDelta(), range[0], countOfMarks)}
        onChange={(values: number[]) => {
          if (!values.find(Boolean)) return;
          onChange(chosenValue(values[0]!), chosenValue(values[1]));
        }}
      />
    </Wrapper>
  );
}
export default SliderComponent;
