import React from "react";
import styled from "styled-components";



const Wrapper = styled.div`

`;

type Props = {
    children: JSX.Element,
};

function DropDownList({children} : Props) {

  return (
    <Wrapper>
        <select>
            <option></option>
        </select>
    </Wrapper>
  );
}

export default DropDownList;