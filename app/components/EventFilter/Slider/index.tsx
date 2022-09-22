import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import styled from "styled-components";
import moment, { Moment } from "moment";
import React, { ReactNode } from "react";
import { MarkObj } from "rc-slider/es/Marks";

const Wrapper = styled.div<{
  displayHandle?: string;
  pointerEventsSlider?: string;
  pointerEventsHandle?: string;
}>`
  padding: 43px 0px 43px 0px;
  display: flex;
  align-items: center;
  .rc-slider {
    width: 380px;
    pointer-events: ${(props) => props.pointerEventsSlider};
  }
  .rc-slider-handle {
    pointer-events: ${(props) => props.pointerEventsHandle};
    display: ${(props) => props.displayHandle};
    background: #ff8a00;
    border: 2px solid #ffab49;
    height: 29px;
    width: 29px;
    top: -8px;
    opacity: 1;
  }
  .rc-slider-dot {
    background: #cacaca;
    border: none;
    border-radius: 5px 5px 5px 5px;
    width: 2px;
    height: 15px;
    top: -5px;
    z-index: -1;
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
  range: Array<number | string | Moment>;
  countOfMarks: number;
  handlePosition: Array<number>;
  onChange: (start: Moment | ReactNode, end: Moment | ReactNode) => void;
};

const isNumberRange = (range: Props["range"]) =>
  typeof range[0] === "number" && typeof range[range.length - 1] === "number";

const isMomentRage = (range: Props["range"]) =>
  range[0] instanceof moment && range[range.length - 1] instanceof moment;

const isDifferentTypes = (range: Props["range"]) =>
  typeof range[0] !== typeof range[range.length - 1];

const isLessRange = (range: Props["range"]) =>
  range[0] <= range[range.length - 1];

const isStringRage = (range: Props["range"]) =>
  typeof range[0] === "string" && typeof range[range.length - 1] === "string";

const isValidMomentRange = (range: Props["range"]) =>
  (range[0] as Moment).isValid() &&
  (range[range.length - 1] as Moment).isValid();

const isValidRange = (range: Props["range"]) =>
  range[0] === undefined ||
  range[range.length - 1] === undefined ||
  range[0] === null ||
  range[range.length - 1] === null;

const SliderComponent = ({
  range,
  countOfMarks,
  onChange,
  handlePosition,
}: Props) => {
  if (isValidRange(range))
    return (
      <Wrapper
        displayHandle="none"
        pointerEventsSlider="none"
        pointerEventsHandle="auto"
      >
        <Slider range />
      </Wrapper>
    );

  const checkType = () => {
    if (isDifferentTypes(range)) {
      console.warn("types of start and end are different");

      return false;
    }

    if (isNumberRange(range)) {
      return isLessRange(range);
    }

    if (isMomentRage(range)) {
      return isValidMomentRange(range);
    }

    return true;
  };

  if (!checkType()) {
    return (
      <Wrapper displayHandle="none">
        <Slider range disabled />
      </Wrapper>
    );
  }

  const nameType = () => {
    if (isNumberRange(range)) return "number";
    if (isMomentRage(range)) return "date";
    if (isStringRage(range)) return "string";

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
        // we know that range is array of numbers
        return (range[range.length - 1] as number) - (range[0] as number) + 1;
      case "date":
        // we know that range is array of moments
        return (
          Math.abs(
            Math.ceil(
              (range[0] as Moment).diff(range[range.length - 1], "days")
            )
            // one more magical 1. controls count of output marks
          ) + 1
        );
      case "string":
        return range.length;
      default:
        console.warn(checkType());

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
        console.warn(checkType());

        return {};
    }
  };

  const chosenValue = (index: number): string | Moment | ReactNode | number => {
    try {
      if (nameType() === "date") {
        // if we working with dates we know that we will received string
        return moment(
          createMarks(findDelta(), range[0], findDelta())[index]
            .label as string,
          "DD.MM"
        );
      }

      return createMarks(findDelta(), range[0], findDelta())[index].label;
    } catch {
      console.warn("cant find chosen value in slider");

      return "";
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
        defaultValue={[handlePosition[0], handlePosition[1]]}
        marks={createMarks(findDelta(), range[0], countOfMarks)}
        onChange={(values: number | number[]) => {
          if (!Array.isArray(values)) {
            values = [values, values];
          }
          onChange(chosenValue(values[0]), chosenValue(values[1]));
        }}
      />
    </Wrapper>
  );
};

export default React.memo(SliderComponent);
