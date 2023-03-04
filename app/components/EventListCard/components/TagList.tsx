import styled from "styled-components";
import React from "react";
import Column from "../../Layout/Column";

const TagList = styled(Column)`
  padding: 10px;
  position: absolute;
  top: 0;
  right: 0;
`;

export default React.memo(TagList);
