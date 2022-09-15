import styled from "styled-components";

const Wrapper = styled.div<Props>`
  display: flex;
  flex-direction: row;
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  justify-content: ${(props) => props.justifyContent || "center"};
  align-items: ${(props) => props.alignItems || "center"};
`;

type Props = {
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
};

export default Wrapper;
