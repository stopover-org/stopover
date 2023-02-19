import React, { useState } from "react";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import Gallery, { GalleryProps } from "../components/Gallery";

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

export default {
  title: "Components/Gallery",
  component: Gallery,
  argTypes: {
    maxHeight: {
      options: ["350px", "none"],
      control: { type: "radio" },
    },
    numberInRow: {
      options: [1, 2, 3, 4],
      control: { type: "radio" },
    },
    width: {
      options: ["250px", "500px", "600px", "700px"],
      control: { type: "radio" },
    },
    minHeight: {
      options: ["100px", "200px", "300px"],
      control: { type: "radio" },
    },
  },
} as ComponentMeta<typeof Gallery>;

// onOpen and onClose was excluded from args but they will not be used
const Template = ({ images, onOpen, onClose, ...args }: GalleryProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setIsOpen] = useState(false);

  return (
    <Gallery
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      images={imagesArray}
      {...args}
    />
  );
};

export const Default: ComponentStory<typeof Gallery> = Template.bind({});

Default.args = {
  opened: false,
  width: "500px",
  minHeight: "200px",
  maxHeight: "350px",
  numberInRow: 2,
};
