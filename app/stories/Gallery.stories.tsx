import React, { useState } from "react";
import Gallery from "../components/Gallery";

const imagesArray: any = [
    {src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg", title: "Boating"},
    {src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg", title: "cycling"},
    {src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg", title: "nord hiking"},
    {src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg", title: "eating"},
    {src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg", title: "family cycling" },
    {src: "https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg", title: "diving"},
];

export default {
    title: "Components/Gallery",
    component: Gallery,
    argTypes: {
        maxHeight: {
            options: [ '350px', 'none'],
            control: {type: 'radio'},
        },
        numberInRow: {
            options: [1, 2, 3, 4],
            control: {type: 'radio'},
        },
        width: {
            options: ['250px', '500px', '600px', '700px'],
            control: {type: 'radio'},
        },
        minHeight: {
            options: ['100px', '200px', '300px'],
            control: {type: 'radio'},
        },
    },
};



const Template = ({
   //numberInRow,
    //onOpen,
    //onClose,
    images,
    //width,
   //opened,
    ...args
}: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    

    return (
        <Gallery
            onOpen={() => setIsOpen(true)}
            onClose={() => setIsOpen(false)}
            //opened={isOpen}
            images={imagesArray}
            numberInRow
            minHeight={'100px' || "none"}
            maxHeight="350px"
            //width="500px"
            {...args}
        />
    );

};


export const Default = Template.bind({});

Default.args = {
    opened: false,
    width: "500px",
    minHeight: '200px',
    maxHeight: "350px",    
    numberInRow: 2,

};
