import React from 'react';
import BookingCard from "../components/BookingCard";
import Typography from "../components/Typography";
import Image from "next/image";

export default {
    title: "Components/BookingCard",
    component: BookingCard,
}

const Template = (args: any) => <BookingCard {...args} />

export const Default = Template.bind({})
