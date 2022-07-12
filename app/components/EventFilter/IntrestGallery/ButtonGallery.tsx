import React from "react";
import right from "../../icons/Solid/Interface/Arrow right.svg";
import left from "../../icons/Solid/Interface/Arrow left.svg";
import styled from "styled-components";

const Wrapper = styled.div<{gradient: string}>`
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: relative;
    width: 45px;
    height: inherit;
    background: linear-gradient(${props=>props.gradient}, #ffffff 25%, rgba(0,212,255,0) 100%);
    img{
        width: 50px;
        height: 50px;
    }
`;

type Props = {
    buttonDirection: string,
    onClick: (buttonDirection: string) => void,
}


function ButtonGallery(props: Props) {
    const leftGradient = "-90deg"
    const rightGradient = "90deg"
    return (
        <Wrapper
            gradient={props.buttonDirection === "left" ? rightGradient : leftGradient}
            onClick={() => props.onClick(props.buttonDirection)}
        >
            <img 
                src={props.buttonDirection === "left" ? left.src : right.src}
            />
        </Wrapper>
    );
}

export default ButtonGallery;