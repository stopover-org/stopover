import React, { useState } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import LocationInput from "./LocationInput";
import DropDownList from "./DropDownList";
import Slider from "./Slider";
import { durationFrom, durationTo, chooseAmount } from "../../constants";
import Calendar from "./Calander";

const FilterBar = styled.div`
  width: 454px;
  margin: 0px;
`;
const FilterBarItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 0px 15px 45px;
  border-right: 1px solid black;
  .text {
    padding: 29px 0px 50px 0px;
    height: 29px;
    font-size: 24px;
  }
`;
const StartingPoint = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 156px;
  margin: 40px 0px 63px 45px;
`;

function EventFilter() {
  const [filters, setFilters] = useState<{
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const dateHandler = (
    startDate: moment.Moment | null,
    endDate: moment.Moment | null
  ) => {
    setFilters({
      startDate,
      endDate,
    });
  };
  const sliderHandler = (startDate: Moment, endDate: Moment) => {
    console.log(startDate, endDate);
  };

  return (
    <FilterBar>
      <StartingPoint>
        <LocationInput />
        <Calendar dateHandler={dateHandler} />
      </StartingPoint>
      <FilterBarItem>
        <p className="text">Выберите дату</p>
        <Slider
          range={[filters.startDate!, filters.endDate!]}
          countOfMarks={4}
          onChange={sliderHandler}
        />
      </FilterBarItem>

      <FilterBarItem>
        <DropDownList
          paddingRight="30px"
          width="150px"
          description="длительность от"
          options={durationFrom}
        />
        <DropDownList
          width="150px"
          description="длительность до"
          options={durationTo}
        />
      </FilterBarItem>
      <FilterBarItem>
        <DropDownList
          width="281px"
          description="Количество участников"
          options={chooseAmount}
        />
      </FilterBarItem>
    </FilterBar>
  );
}

export default React.memo(EventFilter);
