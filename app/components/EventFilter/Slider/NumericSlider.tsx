import Slider from "rc-slider";

type Props = {
  min: number;
  max: number;
  defaultValue?: [number, number];
  value: [number, number];
  stepsCount: number;
}

export const NumericSlider = ({min, max, defaultValue, value, stepsCount}: Props) => {
  const markStep = (max - min) / stepsCount
  const marks = new Array(stepsCount + 1).fill(null).reduce((res, _, index) => {
    const value = Math.round(min + markStep * index)
    res[value < max ? value : max] = { label: value < max ? value : max }
    return res
  }, {})
  
  return <div style={{height: '100px', width: '100%'}}>
    <Slider
      range
      allowCross={false}
      count={1}
      max={max}
      min={min}
      defaultValue={defaultValue}
      value={value}
      marks={marks}
    />
  </div>
}

export default NumericSlider;