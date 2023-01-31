import React, { useState } from "react";
import Gallery from "../components/Gallery";

const imagesArray: any = [
    {src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg", title: "boating"},
    {src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg", title: "cycling"},
    {src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg", title: "nord hiking"},
    {src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg", title: "eating"},
    {src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg", title: "family cycling" },
    {src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg", title: "diving"},
];

export default {
    title: "Components/Gallery",
    component: Gallery,
};


//const Template = (args: Props) => <Gallery {...args} />;

const Template = ({
    onOpen,
    onClose,
    images,
    width,
    //opened,
    ...args
}: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    

    return (
        <Gallery
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            opened={isOpen}
            images={imagesArray}
            minHeight='100px'
            maxHeight="350px"
            width="500px"
            {...args}
        />
    );

};


export const Default = Template.bind({});

Default.args = {
    opened: false,
    minHeight: '200px',
    maxHeight: "350px"

};