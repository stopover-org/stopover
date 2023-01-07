import styled from "styled-components";
import { getContainerItemUnit } from "../../lib/utils/measures";

const Row = styled.div<Props>`
  display: flex;
  flex-direction: row;
  width: ${(props) =>
    props.width || getContainerItemUnit(props.container, props.item, "100%")};
  height: ${(props) =>
    props.height || getContainerItemUnit(props.container, props.item, "auto")};
  justify-content: ${(props) => props.justifyContent};
  align-items: ${(props) => props.alignItems};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  padding: ${(props) => props.padding || "1px"};
`;

type Props = {
  justifyContent?: string;
  alignItems?: string;
  width?: string;
  height?: string;
  wrap?: string;
  container?: boolean;
  item?: boolean;
  padding?: string;
};
export default Row;
