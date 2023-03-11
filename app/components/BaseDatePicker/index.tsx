import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import getArrayOfDays from './functionModule';
import {getImitateDatasArray, convertAvailableDates, fillTimeArray} from './functionModule';
import Row from '../Row';
import SingleDatePicker from './SingleDatePicker';
import RangeDatePicker from './RangeDatePicker';
import moment from 'moment';
import DateWindow from './DateWindow';
import DatePicker from 'react-datepicker';
import TimeWindow from './TimeWindow';
import Column from '../Column';


let readable: boolean = true;

let timeArray: any;

let availableDatesString = getImitateDatasArray(1150);
// console.log(availableDatesString);
let availableDatesNumber = convertAvailableDates(availableDatesString);
// console.log(availableDatesNumber);

timeArray = fillTimeArray(availableDatesNumber);
console.log(timeArray);

const Block = styled.div`
    display: flex;
    /* flex-direction: column; */
`;



const BaseDatePicker = () => { 
    const [value, setValue] = useState(moment(new Date()).format('YYYY M D'));

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const [timeValue, setTimeValue] = useState(['']);
    const [selectedTime, setSelectedTime] = useState(null);

    console.log(selectedTime);
    

    const onChange = (dates: any) => {
      const [start, end] = dates;
      setStartDate(start);
      setEndDate(end);
    };  

    const changeHandler = (e) => {
        readable = false;
        setValue(e.target.value);           
    };

    const blurHandler = () => {
        readable = true;
    };
   

    useEffect(() => {
        if (readable) {return}
        if (!(value.match(/(\d|\d\d).(\d|\d\d).\d\d\d\d(...|..|.)(\d|\d\d).(\d|\d\d).\d\d\d\d/)) ||
            !value.match(/(\d|\d\d).(\d|\d\d).\d\d\d\d/)) {return}
        if (value.indexOf('-')<0) {return}

        let date: string[] = value.replace('-', '/').split('/');
        setStartDate(new Date(+date[2], +date[1]-1, +date[0]));
        date[3] ?  setEndDate(new Date(+date[5], +date[4]-1, +date[3])) : setEndDate(new Date());
    }, [value]);


    useEffect(() => {    
        if (!readable)  {return}
        let startDateForInput: string[] = (moment(startDate).format('YYYY M D')).split(' ');
        let currentDateForInput: string = startDateForInput[2] + "/" + startDateForInput[1] + "/" +  startDateForInput[0];
        let endDateForInput: string[];
        if (endDate) {
            endDateForInput = moment(endDate).format('YYYY M D').split(' ');
            currentDateForInput += ' - ' + endDateForInput[2] + '/' + endDateForInput[1] + '/' + endDateForInput[0];
        }
        // console.log(currentDateForInput)
        setValue(currentDateForInput);
        // console.log(value)
    }, [startDate, endDate]);


    useEffect(() => {
        let date: string[] = (moment(startDate).format('YYYY M D')).split(' ');
        let time: string[] = timeArray[+date[0]][+date[1]][+date[2]-1].time;
        setTimeValue(time);
        
    }, [startDate]);

    useEffect(() => {
        setSelectedTime(timeValue[0])
    }, [timeValue]);



    return (
        <Block>             
            <RangeDatePicker 
                onChange={onChange}               
                startDate={startDate}
                endDate={endDate}
                availableDates={availableDatesString}
            />
            {/* <Column>
                <DateWindow 
                    value={value}
                    onChange={(e) => changeHandler(e)}
                    onBlur={blurHandler}
                />
                <TimeWindow
                    timeValue={timeValue}
                    onClick={(e) => setSelectedTime(e.target.value)}                    
                />
             </Column> */}

           
         </Block>
    );

};




export default BaseDatePicker;