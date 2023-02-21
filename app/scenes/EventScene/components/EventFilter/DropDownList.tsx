import React from "react";
import styled from "styled-components";

const Wrapper = styled.div<{ paddingRight: string | undefined }>`
  display: flex;
  flex-direction: column;
  padding-right: ${(props) => props.paddingRight};
`;

const SelectWrapper = styled.select<{ width: string | undefined }>`
  width: ${(props) => props.width};
  height: 35px;
  background: white;
  border-radius: 3px;
`;

const Description = styled.label`
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
`;

type Props = {
  options: Array<{
    label: string;
    value: string;
  }>;
  description: string;
  paddingRight?: string | undefined;
  width: string;
};

type DropdownItemType = {
  label: string;
  value: string;
};

const DropDownList = (props: Props) => (
  <Wrapper paddingRight={props.paddingRight}>
    <Description>{props.description}</Description>
    <SelectWrapper width={props.width}>
      {props.options.map((item: DropdownItemType, index: number) => (
        <option key={index} value={item.value}>
          {item.label}
        </option>
      ))}
    </SelectWrapper>
  </Wrapper>
);

export default React.memo(DropDownList);
