import React from 'react';
// import BaseDatePicker from '../components/BaseDatePicker';
import Datepicker from '../components/BaseDatePicker/Datepicker_3';


// export default {
//     title: "Components/BaseDatePicker",
//     component: BaseDatePicker,
// };


// const Template = () => {
//     return (
//         <BaseDatePicker />
//     );
// };


// export const Default = Template.bind({});
// // Default.args = {};

export default {
    title: "Components/Datepicker",
    component: Datepicker,
};


const Template = () => {
    return (
        <Datepicker />
    );
};


export const Default = Template.bind({});
// Default.args = {};