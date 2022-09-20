import Slider from "rc-slider";
import BaseSlider from "./BaseSlider";

export type RangeType = [number, number];

type Props = {
  min: number;
  max: number;
  defaultValue?: RangeType;
  value: RangeType;
  stepsCount: number;
  onChange: (newRange: RangeType) => void;
};

export const NumericSlider = ({
  min,
  max,
  defaultValue,
  value,
  stepsCount,
  onChange,
}: Props) => {
  const markStep = (max - min) / stepsCount;

  const marks = new Array(stepsCount + 1).fill(null).reduce((res, _, index) => {
    const val = Math.round(min + markStep * index);

    res[val < max ? val : max] = { label: val < max ? val : max };
    return res;
  }, {});

  return (
    <BaseSlider>
      <Slider
        range
        allowCross={false}
        count={1}
        max={max}
        min={min}
        defaultValue={defaultValue}
        value={value}
        marks={marks}
        onChange={(val) =>
          onChange(Array.isArray(val) ? [val[0], val[1]] : [val, val])
        }
      />
    </BaseSlider>
  );
};

export default NumericSlider;
