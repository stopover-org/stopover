import React from "react";
import { Meta, StoryObj } from "@storybook/react";
import Gallery from "components/v2/Gallery";

const imagesArray: any = [
  {
    src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
    title: "Boating",
  },
  {
    src: "https://via.placeholder.com/500x200",
    title: "cycling",
  },
  {
    src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
    title: "nord hiking",
  },
  {
    src: "https://via.placeholder.com/500x75",
    title: "eating",
  },
  {
    src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
    title: "family cycling",
  },
  {
    src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg",
    title: "diving",
  },
];
// onOpen and onClose was excluded from args but they will not be used
const Preview = () => <Gallery images={imagesArray} width="600px" />;

export default {
  title: "Components/V2/Gallery",
  component: Preview,
} as Meta<typeof Gallery>;

export const DesignPreview: StoryObj<typeof Preview> = {
  args: {
    controls: { hideNoControlsWarning: true },
  },
};
