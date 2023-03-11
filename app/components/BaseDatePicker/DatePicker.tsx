import React, { useState } from 'react';
import styled from 'styled-components';
import { TypographySize } from '../StatesEnum';



const arrOfDaysNames = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const arrOfMonthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']


const Table = styled.table`
    /* border: 1px solid black; */
    width: 250px;
    height: 250px;
    margin-right: 40px;
    /* position: relative; */
`;

const Caption = styled.caption`
    padding: 0 5px;
    /* position: relative; */
    /* border: 1px solid green; */
`;

const Th = styled.th`
    height: 30px;
    /* border: 1px solid #ccc; */
`;

const Tbody = styled.tbody<{height? : string}>`
    height: ${props => props.height};
    position: relative;
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
    /* width: 50px;
    height: 50px; */
    
    background-color: ${props => props.backgroundColor};
    text-align: center;
`;


const ArrowRight = styled.div`
    border-color: #8ca38c;
    border-style: solid;
    border-width: 4px 4px 0 0;
    content: '';
    height: 15px;
    width: 15px;
    transform: rotate(45deg);
    cursor: pointer;
    
`;


const ArrowLeft = styled.div`
    border-color: #8ca38c;
    border-style: solid;
    border-width: 4px 4px 0 0;
    content: '';
    height: 15px;
    width: 15px;
    transform: rotate(-135deg);
    cursor: pointer;     
    
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    
    /* border: 1px solid black; */
`;



const NavCalendar = styled.div`
    display: flex;
    flex-direction: column;
    
    /* justify-content: flex-start; */
    /* border: 1px solid black;     */
    margin-bottom: 5px;
    cursor: pointer; 
    gap: 2px;
    position: absolute;
    right: -25px;
`;

const DelCalendar = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
       width: 20px;
       height: 60px;
       border-radius:  5px  5px 0 0;
       background-color: #8ca38c;
       /* border: 1px solid #000; */
       text-align: center;
       
`;

const NextCalendar = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: 20px;
       height: 60px;
       border-radius: 0 0 5px 5px;
       background-color: #8ca38c;
       /* border: 1px solid #000; */
`;


export type DatePickerProps = {
    clickNavigation: (arrow: string) => void;
    moveHandler: () => void;
    getArrayOfDays: (year: number, month: number) => number[][];        
    checkDate: (year: number, month: number) => {year: number, month: number};
    clickHandler: () => void;
    plusOneCalendar: (num: number) => void;
    clickDelCalendar: (numOfTable: number) => void;
    currentDate: {year: number, month: number};
    mainState: any;
    numOfTable: number;
};

const DatePicker = ({
    clickNavigation,
    moveHandler,
    getArrayOfDays,
    checkDate,
    clickHandler,
    plusOneCalendar,
    clickDelCalendar,    
    currentDate,
    mainState,    
    numOfTable,

}: DatePickerProps) => {
    const mouseEnterHandler = (numOfTable: number): void => {
        if (numOfTable > 1) {return};
        plusOneCalendar(numOfTable);
    }

    let d = currentDate;
    let year: number = d.year;
    let month: number = d.month + numOfTable;
    d = checkDate(year, month);
    year = d.year;
    month = d.month;
    
    let arrayOfDays: number[][] = getArrayOfDays(year, month-1);
    let array = mainState[String(year)][String(month)];

    return (
        <Table>           
            <Caption>               
                <Header onMouseEnter={() => mouseEnterHandler(numOfTable+1)}>
                    <ArrowLeft id="left" onClick={() => clickNavigation("left")}/>                
                        {arrOfMonthNames[month-1] + ' ' + year}
                    <ArrowRight 
                        id="right" 
                        onClick={() => clickNavigation("right")}                        
                    />                    
                 </Header>
                </Caption>
            <Tbody height='15px'>
                <Tr>
                    {arrOfDaysNames.map((item, i) => {
                        return (
                            <Th key={item + i}>{item}</Th>
                        )
                    })}
                </Tr>
            </Tbody>
            <Tbody onMouseMove={moveHandler}>
                {(numOfTable !=0) && 
                    <NavCalendar>
                        <DelCalendar
                            onClick={() => clickDelCalendar(numOfTable)}
                        >X
                        </DelCalendar>
                        <NextCalendar
                            onClick={() => {plusOneCalendar(numOfTable+1)}}
                        >+
                        </NextCalendar>                        
                    </NavCalendar>}
                {
                    arrayOfDays.map((row,i) => {
                        return(
                        <Tr key={i}>
                            {row.map((cell, j) => {
                                return (
                                    <Td  
                                        key={'td' + i + j}
                                        border={cell ? "1px solid green" : "none"}
                                        color={cell ? (array[cell-1]['workingDate'] ? "#000" : "#999") : "transparent"}                                       
                                        backgroundColor={
                                            cell 
                                            ? (array[cell-1]['selectedDate'] 
                                                ? "#8ca38c" 
                                                : (array[cell-1]['currentDate'] 
                                                    ? "orange" 
                                                    : "#fff")) 
                                            : "#fff"}
                                        onClick={clickHandler}
                                        id={String(year + '/' + String(month + '/' + String(cell)))}                                       
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
    )
}

export default DatePicker;