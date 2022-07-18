import 'rc-slider/assets/index.css';
import Slider from 'rc-slider';
import styled from "styled-components";
import moment, {Moment} from "moment";
import React, { useEffect, useState } from 'react';

const Wrapper = styled.div`
  .rc-slider {
    width: 380px;
  }
`;

type Props = {
  fromDate?: Moment,
  toDate?: Moment,
  step: number
}

const SliderComponent = (props: Props) => {
  let deltaDays= 0;
  const [sliderPoints, setSliderPoints] = useState([{label: ''}]);
  
  const createMarks = () => {
    if(deltaDays==null) return null;
    const cloneDate = props.fromDate.clone();
    const array = new Array(deltaDays)
      .fill(null)
      .reduce((obj, item, index)=>{
        console.log(index%props.step==0)
      if(index%props.step==0){
        obj[index]={label: cloneDate.format("DD.MM")};
      }
      if(deltaDays-1 == index){
        obj[index]={label: cloneDate.format("DD.MM")};
      }
      cloneDate.add(1, "days");

      return obj;
    },{})

    return array;
  }

  useEffect(() => {
    if(props.fromDate!=undefined && props.toDate!=undefined){
      deltaDays = Math.abs(Math.ceil(props.fromDate.diff(props.toDate, "days")))
    }else{
      deltaDays = null;
    }
    setSliderPoints(createMarks());
  },[deltaDays, props.step])


  return (
    <Wrapper>
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