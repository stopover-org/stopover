import styled from "styled-components";
import React, { useState } from 'react';

const Wrapper = styled.div`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    filter: contrast(20);
`;

const Circle = styled.div<{left: number}>`
    position: absolute;
    filter: blur(15px);
    left: ${props => props.left}px;
    border-radius: 50%;
    background: black;
    width: 100px;
    height: 100px;


`;

const Square = styled.div`
    background: blue;
    width: 100px;
    height: 100px;
`;


const SliderComponent = () => {
    const [state, setState] = useState(100);
    const clickHandler = (step: number) => {
        setState(state+step);
    }

    return (
        <Wrapper>

            <Circle
                left={10}
            />
            <Circle
                left={state}
            />
            <Square />
            <button onClick={() => clickHandler(-25)}>left</button>
            <button onClick={() => clickHandler(25)}>right</button>
        </Wrapper>
    )};
export default SliderComponent

