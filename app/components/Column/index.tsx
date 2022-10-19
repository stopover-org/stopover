import styled from "styled-components";

const Column = styled.div<Props>`
  display: flex;
  flex-direction: column;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "auto"};
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
`;

type Props = {
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  wrap?: string;
};

export default Column;
