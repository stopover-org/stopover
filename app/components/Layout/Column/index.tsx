import styled from "styled-components";
import { getContainerItemUnit } from "../../../lib/utils/measures";

const Column = styled.div<Props>`
  display: flex;
  flex-direction: column;
  flex: ${(props) => props.flex};
  width: ${(props) =>
    props.width || getContainerItemUnit(props.container, props.item)};
  height: ${(props) =>
    props.height || getContainerItemUnit(props.container, props.item)};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  border: ${(props) => props.border};
`;

type Props = {
  justifyContent?: string;
  alignItems?: string;
  flex?: number;
  width?: string;
  height?: string;
  wrap?: string;
  container?: boolean;
  item?: boolean;
  border?: string;
};

export default Column;
