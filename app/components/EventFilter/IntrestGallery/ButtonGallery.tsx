import React from "react";
import right from "../../icons/Solid/Interface/Arrow right.svg";
import left from "../../icons/Solid/Interface/Arrow left.svg";
import styled from "styled-components";

const Wrapper = styled.div`
    cursor: pointer;
`;

type Props = {
    type: string,
    onClick: () => void,
}


function ButtonGallery(props: Props) {

  return (
    <Wrapper
        onClick={props.onClick}
    >
        <img 
            src={props.type === "left" ? right.src : left.src}
        />
    </Wrapper>
  );
}

export default ButtonGallery;