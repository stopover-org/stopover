import React from "react";
import styled from "styled-components";



const Wrapper = styled.div`
    display: inline-block;
`;

const SelectWrapper = styled.select`
    width: 150px;
    height: 35px;
    border: 1px solid #000000;
    border-radius: 3px;
`;

const Description = styled.label`
    font-family: 'Inter';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
`;

type Props = {
    options: Array<{
      label: string,
        value: string,  
    }>,
    description: string,
}

type DropdownItemType = {
    label: string,
    value: string
}

function DropDownList(props : Props) {

    return (
        <Wrapper>
            <Description>
                {props.description}
            </Description>
            <SelectWrapper>
               {props.options.map((item: DropdownItemType, index: number) => {
                    return(
                        <option key={index} value={item.value}>{item.label}</option>
                    );
                })}
            </SelectWrapper>
        </Wrapper>
    );
}

export default DropDownList;