import Slider from "rc-slider";
import moment from "moment";
import BaseSlider from "./BaseSlider";

type RangeType = [number, number];

type Props = {
  min: number;
  max: number;
  defaultValue?: RangeType;
  value: RangeType;
  stepsCount: number;
  onChange: (newRange: RangeType) => void;
};

export const DatesSlider = ({
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

    res[val < max ? val : max] = {
      label:
        val < max
          ? moment.unix(val).format("DD.MM")
          : moment.unix(max).format("DD.MM"),
    };
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
        marks={marks}
        defaultValue={defaultValue}
        value={value}
        onChange={(val) =>
          onChange(Array.isArray(val) ? [val[0], val[1]] : [val, val])
        }
      />
    </BaseSlider>
  );
};

export default DatesSlider;
