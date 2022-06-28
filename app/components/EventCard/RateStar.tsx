import React, { useState }  from "react";
import styled from "styled-components";
import { StarUnchecked, StarChecked} from "./StarsIcons";


const StarStyle = styled.div<{backgroundColor: string}>`
    width: 25px;
    height: 25px;
    background-color: ${props => props.backgroundColor};
    margin: 5px;
`;
type Props = {
    index: number,
    rate: number,
    clickHandler: (index: number) => void,
}

function RateStar(props: Props) {

    return (
        <div
            onClick = { () => { props.clickHandler(props.index+1) }}
        >
        {
            props.rate < props.index+1 ? <StarUnchecked color="black"/>  : <StarChecked color="yellow"/>
        }
        </div>
            
    );
  
  }
  export default RateStar;