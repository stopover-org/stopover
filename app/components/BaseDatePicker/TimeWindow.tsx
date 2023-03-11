import React, {useEffect, useState} from 'react';
import styled from 'styled-components';


const Select = styled.select`
    display: block;
    border: 1px solid black;
    width: 200px;
    height: 30px;
    margin-left: 50px;
`;

const Option = styled.option``;




type TimeWindowProps = {
    timeValue: string[];
    onClick: () => void;
}

const TimeWindow = ({timeValue, onClick}: TimeWindowProps) => {

    return (
        <Select
            onClick={onClick}
           
        >
            
            {timeValue.map((item, i) => {
                return (
                    <Option 
                        key={item + i}
                        value={item}
                    >
                        {item}
                    </Option>
                )
            })}
        </Select>

    );

}



export default TimeWindow;