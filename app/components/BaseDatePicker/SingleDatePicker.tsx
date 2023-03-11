import moment from 'moment';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import {getImitateDatasArray} from './functionModule';

let availableDatesString = getImitateDatasArray(50);

import 'react-datepicker/dist/react-datepicker.css';
import './ReactDatePicker.css';


type RangeDatePickerProps = {
    dateInfoToInput: (arr: any) => void;
  }
  

const SingleDatePicker = ({dateInfoToInput}: RangeDatePickerProps) => {
    const [startDate, setStartDate] = useState(new Date());  


    useEffect(() => {        
        let arr = [];
        arr.push(moment(startDate).format('YYYY M D'));         
        dateInfoToInput(arr);
         
     }, [ startDate]);

   
    return (        

        <DatePicker
            selected={startDate}
            onChange={(date: any) => setStartDate(date)}
            shouldCloseOnSelect={false}
            popperClassName='pop'
            calendarClassName='calend'
            wrapperClassName='wrap'
            inline
            monthsShown={1}            
            // minDate={moment().toDate()}
            // dateFormat="dd-MM-yyyy"
            // highlightDates={[2023-02-06]}
            // showTimeSelect
            includeDates={ availableDatesString.map((item)=>{return new Date(item)})}
            
            
        ></DatePicker>
        
        
    )

}



export default SingleDatePicker;