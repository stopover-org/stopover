import React from "react";
import styled from "styled-components";
import { ComponentStory } from "@storybook/react";
import Row from "../components/Layout/Row";

const SRow = styled(Row)`
  width: calc(136px * 5);
`;

const ColorCube = styled.div<{ color: string }>`
  background-color: ${(props) => props.color};
  width: 135px;
  height: 135px;
`;

export default {
  title: "Global Properties/Color Palette",
};

const ColorPaletteList = [
  "black",
  "#FF8A00",
  "#AD081B",
  "#9D9D9D",
  "#2B5A8C",
  "white",
  "#FFAB49",
  "#007905",
  "#D9D9D9",
];

const Preview = () => (
  <SRow wrap="wrap">
    {ColorPaletteList.map((item, index) => (
      <ColorCube key={index} color={item} />
    ))}
  </SRow>
);

export const DesignPreview: ComponentStory<typeof Preview> = Preview;

DesignPreview.parameters = {
  controls: { hideNoControlsWarning: true },
};
