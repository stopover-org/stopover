import React, { useState } from 'react';
import styled from 'styled-components';
import getArrayOfDays from './functionModule';
import {getStyleArray} from './functionModule';
import {getImitateDatasArray, convertAvailableDates, fillInitialState, getInitialStateSchema} from './functionModule';

let today = new Date();    
let year: number = today.getFullYear();
let month: number = today.getMonth()+1;

let initialCurrentDate = {year: year, month: month}
//const arrOfDaysNames = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
//const arrOfDaysNames = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС'];
const arrOfDaysNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    
let initialState: any;

//let start = Date.now()
let availableDatesString = getImitateDatasArray(30);
//console.log(availableDatesString);
let availableDatesNumber = convertAvailableDates(availableDatesString);
//console.log(availableDatesNumber);
const initialStateSchema = getInitialStateSchema(availableDatesNumber);
//let end = Date.now();
//console.log(initialState);
//console.log(end-start);
initialState = fillInitialState(initialStateSchema, availableDatesNumber);
//let end = Date.now();
//console.log(end-start);
//console.log(initialState);





const Table = styled.table`
    //border: 1px solid black;
    width: 300px;
    height: 300px;
`;

const Caption = styled.caption``;

const Th = styled.th`
    height: 50px;
    border: 1px solid #ccc;
`;

const Tbody = styled.tbody<{height? : string}>`
    height: ${props => props.height};
`;

const Tr = styled.tr`
    /* border: 1px solid red; */
    
`;

const Td = styled.td<{
    border: string,
    color: string,
    backgroundColor: string,
}>`
    border: ${props => props.border};
    color: ${props => props.color};
    background-color: ${props => props.backgroundColor};
    text-align: center;
`;

const BaseDatePicker = () => {      
    
    const [mainState, setMainState] = useState(initialState);
    const [currentDate, setCurrentDate] = useState(initialCurrentDate);
    const [range, setRange] = useState();
    
    let arrayOfDays = [[]];
    arrayOfDays = getArrayOfDays(currentDate.year, currentDate.month-1);



   
   


    const clickHandler = (e) => {

       let index = Number(e.target.innerText); 
       if (index==0) {return}
       //let selectControl = [currentDate.year, currentDate.month, index]

     

        setMainState({
            ...mainState,
            [String(currentDate.year)]: {
                [String(currentDate.month)]: [
                    ...mainState[String(currentDate.year)][String(currentDate.month)],               
                ].map((obj, i) => {                    
                    if ((i==index-1) && (obj.workingDate==true)) {
                        return {...obj, selectedDate: true};
                    } else {return {...obj, selectedDate: false}};
                })            
            }
        })      
    }

    let currentCellInRange=0;
    const moveHandler = (e) => {return;
        let date = Number(e.target.innerText);
        if (date == 0) {return}
        if (date == currentCellInRange) {return}
        currentCellInRange = date;
        //console.log(e.target.innerText)

        setMainState({
            ...mainState,
            [String(currentDate.year)]: {
                [String(currentDate.month)]: [
                    ...mainState[String(currentDate.year)][String(currentDate.month)],               
                ].map((obj, i) => {                    
                    if ((i==date-1) && (obj.workingDate==true)) {
                        return {...obj, selectedDate: true};
                    } else {return {...obj, selectedDate: false}};
                })            
            }
        }) 
    }



    let array = mainState[String(currentDate.year)][String(currentDate.month)];
    return (
 
        <Table  onMouseMove={moveHandler}>
            <Caption>February</Caption>
            <Tbody height='15px'>
                <Tr>
                    {arrOfDaysNames.map((item, i) => {
                        return (
                            <Th key={item + i}>{item}</Th>
                        )
                    })}
                </Tr>
            </Tbody>
            <Tbody>
                {
                    arrayOfDays.map((row,i) => {
                        return(
                        <Tr key={i}>
                            {row.map((cell, j) => {
                                return (
                                    <Td                                     
                                        key={'td' + i + j}
                                        border={cell ? "1px solid green" : "none"}
                                        color={cell ? (array[cell-1]['workingDate'] ? "red" : "black") : "transparent"}
                                       
                                        backgroundColor={cell ? (array[cell-1]['selectedDate'] ? "blue" : (array[cell-1]['currentDate'] ? "orange" : "#fff")) : "#fff"}
                                        onClick={clickHandler}
                                    >
                                        {cell}

                                    </Td>
                                )
                            })}

                        </Tr>
                        )
                    })

                }
            
            </Tbody>
        </Table>

    );

};




export default BaseDatePicker;