import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import styled from "styled-components";
import moment, {Moment} from "moment";
import React, { useEffect, useState } from 'react';

const Wrapper = styled.div<{display: string}>`
  .rc-slider {
    width: 380px;
  }
  .rc-slider-handle{
    display: ${props => props.display};
  }
`;

type Props = {
  fromDate?: Moment,
  toDate?: Moment,
  countOfElements: number
}

const SliderComponent = (props: Props) => {
  if (!props.fromDate?.isValid() || !props.toDate?.isValid()) {
    return (
      <Wrapper
        display={"none"}
      >
        <Slider
          range
        />
    </Wrapper>
    )
  }

  const deltaDays = Math.abs(Math.ceil(props.fromDate.diff(props.toDate, "days")-1))
  const [sliderPoints, setSliderPoints] = useState([{label: ''}]);
  
  const stepHandler = (countOfElements: number) => {
    return Math.round(deltaDays/countOfElements);
  }

  const createMarks = () => {
    const cloneDate = props.fromDate.clone();
    let array = new Array(deltaDays).fill(null);

    let flagIndex = 0;
    const step = stepHandler(props.countOfElements-1);
    array = array.reduce((obj, item, index)=>{
      if(index==flagIndex){
        flagIndex+=step;
          obj[index]={label: cloneDate.format("DD.MM")};
      }
      if(deltaDays-1 == index){
        obj[index]={label: cloneDate.format("DD.MM")};
      }

      
      console.log(flagIndex)
      cloneDate.add(1, "days");

      return obj;
    },{})

    return array;
  }

  useEffect(() => {
      setSliderPoints(createMarks());
  },[deltaDays, props.countOfElements])


  return (
    <Wrapper
      display={"block"}
    >
        <Slider
          range
          allowCross={false}
          count={1}
          max={deltaDays-1}
          min={0}
          marks={sliderPoints}
        />
    </Wrapper>
  )};
export default SliderComponent