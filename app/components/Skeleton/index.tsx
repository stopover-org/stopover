import styled from "styled-components";

const Skeleton = styled.div<{
  width?: string;
  height?: string;
  margin?: string;
  border?: string;
  borderRadius?: string;
}>`
  width: ${(props) => props.width || "100%"};
  height: ${(props) => props.height || "100%"};
  margin: ${(props) => props.margin || "0px"};
  border: ${(props) => props.border || "0px solid transparent"};
  border-radius: ${(props) => props.borderRadius || "0px"};
  opacity: 0.7;
  animation: skeleton-loading 1s linear infinite alternate;
  @keyframes skeleton-loading {
    0% {
      background-color: hsl(200, 20%, 70%);
      border-color: hsl(200, 20%, 70%);
    }
    100% {
      background-color: hsl(200, 20%, 95%);
      border-color: hsl(200, 20%, 95%);
    }
  }
`;

export default Skeleton;
