//function creates an array of days for filling the calendar with 0's and num's;
export default function getArrayOfDays(year, month) {

    let firstDay = getWeekDay(year, month, true); //на какой день недели приходится первое число; true - европейский календарь;
    let numberOfDays = getNumberOfDaysInMonth(year, month); //кол-во дней в месяце;
    let daysArray = []; //массив с распределенными по неделям днями месяца;

    let flag = true; //флаг окончания заполнения массива;
    let i = 0; //индекс строк в календаре;
    let numberOfDay = 1; //число месяца;

    while (flag) {
        daysArray[i] = [];

        for (let j=0; j<=6; j++) {
            if (i==0 & j<firstDay) {
                daysArray[i][j] = 0;
                continue;
            } else if (numberOfDay <= numberOfDays){
                daysArray[i][j] = numberOfDay;
                } else {
                    daysArray[i][j] = 0;
                    flag = false;
                    }            
            numberOfDay += 1;
        }	
        i += 1;
    };
    return daysArray;
};


//function creates an arrow of styles for styling cells of the calendar;
export function getStyleArray(year, month) {
    let styleArray = [];
    for (let i=0; i<getNumberOfDaysInMonth(year, month); i++) {
        styleArray.push({
            currentDay: false,
            selectedDay: false,
            workingDay: Math.floor(Math.random()*2),
        });
    }
    styleArray[10]['currentDay']=true;
   
    return styleArray;
}

//function fills initialStateSchema with data from availableDatesNumber;
export function fillInitialState(initialStateSchema, availableDatesMumber) {
    let arr = availableDatesMumber;
    let initialState = initialStateSchema;
    let date = new Date();
    let workingDate;
    let currentDate;
    //let selectedDate;
    
    let currentYear = date.getFullYear();
    let currentMonth = date.getMonth()+1;
    let currentDay = date.getDate();

    for (let i=0; i<arr.length; i++) {

        if (arr[i][0] == currentYear && arr[i][1] == currentMonth && arr[i][2] < currentDay) {
            workingDate = false;
        } else {workingDate = true;}

        if (arr[i][0] == currentYear && arr[i][1] == currentMonth && arr[i][2] == currentDay) {
            currentDate = true;
        } else {currentDate = false;}

        // if (arr[i][0]==selectControl[0] && arr[i][1]==selectControl[1] && arr[i][2]==selectControl[2]) {
        //     selectedDate = true;
        // } else {selectedDate = false}

        initialState[String(arr[i][0])][String(arr[i][1])][arr[i][2]-1].workingDate = workingDate;
        initialState[String(arr[i][0])][String(arr[i][1])][arr[i][2]-1].currentDate = currentDate;
        //initialState[String(arr[i][0])][String(arr[i][1])][arr[i][2]-1].selectedDate = selectedDate;

        if (workingDate) {
            initialState[String(arr[i][0])][String(arr[i][1])][arr[i][2]-1].time.push(String(arr[i][3]) + '-' + arr[i][4]);
        }
    }
    return initialState;
}



//function creates an array of ISO-string dates for imitating data from server;
export function getImitateDatasArray(quant) {
    let imitateDatasArray = [];
    let timestamp = 1675518651000;
    for (let i=0; i<quant; i++) {
        timestamp += 51560000;
        let date = new Date(timestamp);
        imitateDatasArray[i] = numberToISOString(date);
    }
    return imitateDatasArray;
    // console.log(imitateDatasArray);
}


//function converts array of string data into array of number data;
export function convertAvailableDates(availableDates) {
    let arr = [];
    for (let i=0; i<availableDates.length; i++) {
        let date = new Date( Date.parse(availableDates[i]));
        arr[i] = [];
        arr[i].push(date.getFullYear());
        arr[i].push(date.getMonth() + 1);
        arr[i].push(date.getDate());
        arr[i].push(date.getHours());
        arr[i].push(date.getMinutes());
    }
    return arr;

}


//function creates initialState;
export function getInitialStateSchema(availableDates) {
    let startYear = availableDates[0][0]; //год в первой строке массива availableDates;
    let endYear = availableDates[availableDates.length-1][0]; //год в последней строке массива availableDates;
    let startMonth = availableDates[0][1]; //номер месяца в первой строке массива availableDates;
    let endMonth = availableDates[availableDates.length-1][1]; //номер месяца в последней строке массива availableDates;
   
    let initialStateSchema = {};	

    initialStateSchema[String(startYear)] = getObjOfMonthes(startMonth, 12, startYear);
   
    if ((endYear - startYear)==1) {initialStateSchema[String(endYear)] = getObjOfMonthes(1, endMonth, endYear);}
    if ((endYear - startYear)>1) {
        for (let year = startYear+1; year <= endYear-1; year++) {
            initialStateSchema[String(year)] = getObjOfMonthes(1, 12, year);
        }
        initialStateSchema[String(endYear)] = getObjOfMonthes(1, endMonth, endYear);
    }
    return initialStateSchema;	
}


function getObjOfMonthes(start, end, year) {
    let obj = {};
    for (let month=start; month<=end; month++) {
        let numberOfDays = getNumberOfDaysInMonth(year, month-1);
        obj[String(month)] = getArrOfDatesProps(numberOfDays);
    }
    return obj;
}

function getArrOfDatesProps(num) {
    let arrOfDatesProps = [];
    for (let i=0; i<num; i++) {
        arrOfDatesProps.push({currentDate: false, selectedDate: false, workingDate: false, time: []});        
    }
    return arrOfDatesProps;
}



function numberToISOString(date){
    function numToString(n) {return n<10 ? '0'+n : n}
	let arr = [];
	arr[0] = date.getFullYear();	
	arr[1] = numToString(date.getMonth()+1);	
	arr[2] = numToString(date.getDate());
	arr[3] = numToString(date.getHours());
	arr[4] = numToString(date.getMinutes());
	arr[5] = numToString(date.getSeconds());
	return arr[0] + '-' + arr[1] + '-' + arr[2] + 'T' + arr[3] + ':' + arr[4] + ':' + arr[5] + 'Z';	
}








function getNumberOfDaysInMonth(year, month) {
  let date = new Date(year, month + 1, 0);
  return date.getDate();
}


function getWeekDay(year, month, local) {
	let date = new Date(year, month);
	if(!local){return date.getDay();}
	if(date.getDay() == 0){return 6;}
	return date.getDay() - 1;
	
}
