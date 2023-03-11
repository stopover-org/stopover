import React, {useEffect, useState} from 'react';
import styled from 'styled-components';


const Window = styled.input`
    display: block;
    border: 1px solid black;
    width: 200px;
    height: 30px;
    margin-left: 50px;
    margin-bottom: 100px;
`;


type DateWindowProps = {
    value: string;
    onChange: () => void;
    onBlur: () => void;
}

const DateWindow = ({
    value,
    onChange,
    onBlur,

}: DateWindowProps) => {
    const [readable, setReadable] = useState(true);
    const [inputData, setInputData] = useState('')

  

    return (
        <Window 
            type="text"
            value={value}
            onChange={onChange}
            onBlur={onBlur}       
        />
    )

}

export default DateWindow;