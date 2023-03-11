import React, {forwardRef, useEffect, useState} from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';
import './ReactDatePicker.css';





type RangeDatePickerProps = {
  startDate: Date;
  endDate: Date;
  availableDates: string[];
  onChange: () => void;
  
}

const RangeDatePicker =({
  startDate,
  endDate,
  availableDates,
  onChange,
  
}: RangeDatePickerProps) => {   

    return (
      <DatePicker
        selected={startDate}
        onChange={onChange}
        startDate={startDate}
        endDate={endDate}
        selectsRange
        inline
        // dateFormat="dd-MM-yyyy"
        includeDates={ availableDates.map((item)=>{return new Date(item)})}
        // selectsDisabledDaysInRange
        // popperClassName='pop'
            // calendarClassName='calend'
            // dayClassName={()=> true ? 'dayclass' : undefined}
        //  wrapperClassName='wrap'
        // monthsShown={3}
      />
    );
  };

export default RangeDatePicker;