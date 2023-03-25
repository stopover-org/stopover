import React, {forwardRef, useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './ReactDatePicker.css';


const Datepicker = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const[currentMonth, setCurrentMonth] = useState(moment(startDate).get('month'));







    const onChange = (dates: Date[]) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    }

    
    return (
        <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        // dateFormat="dd-MM-yyyy"
        // includeDates={ availableDates.map((item)=>{return new Date(item)})}
        // selectsDisabledDaysInRange
        // popperClassName='pop'
            // calendarClassName='calend'
            // dayClassName={()=> true ? 'dayclass' : undefined}
        //  wrapperClassName='wrap'
        // monthsShown={2}
        calendarStartDay={1}
        dayClassName={(date) => (moment(date).get('month') != currentMonth) ?  "react-datepicker__day_empty" : "react-datepicker__day"}
        onMonthChange={(date) => {setCurrentMonth(moment(date).get('month'))}}
    
       
         />
    )
}


export default Datepicker;