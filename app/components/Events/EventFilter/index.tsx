import React, { useState } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import LocationInput from "./LocationInput";
import IndividualEvents from "./IndividualEvents";
import Slider from "./Slider";
import Calendar from "./Calander";
import Rate from "./Rate";

const FilterBar = styled.div`
  width: 454px;
  margin: 0px;
  margin-right: 56px;
  padding-left: 30px; //top right bottom left
`;

const MainFilters = styled.div`
  border-right: 1px solid black;
`;

const FilterBarItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 30px 0px 30px 0px;
`;

const TextInformation = styled.p`
  padding: 29px 0px 50px 0px;
  height: 29px;
  font-size: 24px;
`;

const StartingPoint = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  height: 156px;
  margin: 0px 0px 63px 0px;
`;

const Separator = styled.div`
  width: 400px;
  border-bottom: 1px solid #d9d9d9;
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
      <MainFilters>
        <FilterBarItem>
          <div>
            <TextInformation>Выберите дату</TextInformation>
            <Slider
              range={[filters.startDate!, filters.endDate!]}
              countOfMarks={4}
              onChange={sliderHandler}
            />
          </div>
        </FilterBarItem>
        <Separator />
        <FilterBarItem>
          <IndividualEvents />
          <TextInformation>Индивидуальное мероприятие</TextInformation>
        </FilterBarItem>
        <Separator />
        <FilterBarItem>
          <div>
            <TextInformation>Рейтинг</TextInformation>
            <Rate />
          </div>
        </FilterBarItem>
      </MainFilters>
    </FilterBar>
  );
}

export default React.memo(EventFilter);
