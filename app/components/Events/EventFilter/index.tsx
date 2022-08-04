import React, { useState } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import LocationInput from "./LocationInput";
import IndividualEvents from "./IndividualEvents";
import Slider from "./Slider";
import Calendar from "./Calander";
import Rate from "./Rate";
import Help from "./Help";

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

const TextInformation = styled.label`
  display: flex;
  flex-direction: row;
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
  const [selectedDates, setSelectedDates] = useState<{
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }>({
    startDate: null,
    endDate: null,
  });

  /* const [selectedPrice, setSelectedPrice] = useState<{
    startPrice: number | null;
    endPrice: number | null;
  }>({
    startPrice: null,
    endPrice: null,
  }); */

  const [selectedIndividualOnly, setSelectedIndividualOnly] =
    useState<boolean>(false);
  const [selectedRate, setSelectedRate] = useState<number>(0);

  const individualEventsHandler = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    if (event === null) throw new Error("check box returned null");
    setSelectedIndividualOnly(event.currentTarget.checked);
  };

  const rateHandler = (rateIndex: number) => {
    console.log(rateIndex);
    setSelectedRate(rateIndex);
  };

  const dateHandler = (
    startDate: moment.Moment | null,
    endDate: moment.Moment | null
  ) => {
    setSelectedDates({
      startDate,
      endDate,
    });
  };

  const sliderHandler = (startDate: Moment, endDate: Moment) => {
    console.log(startDate, endDate);
  };
  console.log(selectedRate, selectedIndividualOnly); // to silence husky
  return (
    <FilterBar>
      <StartingPoint>
        <LocationInput />
        <Calendar dateHandler={dateHandler} />
      </StartingPoint>
      <MainFilters>
        <FilterBarItem>
          <div>
            <TextInformation>
              Выберите дату
              <Help text="Выберите какие даты вы хотите просмотреть" />
            </TextInformation>
            <Slider
              range={[selectedDates.startDate!, selectedDates.endDate!]}
              countOfMarks={4}
              onChange={sliderHandler}
            />
          </div>
        </FilterBarItem>
        <Separator />
        <FilterBarItem>
          <IndividualEvents onClick={individualEventsHandler} />
          <TextInformation>Индивидуальное мероприятие</TextInformation>
        </FilterBarItem>
        <Separator />
        <FilterBarItem>
          <div>
            <TextInformation>Рейтинг</TextInformation>
            <Rate onClick={rateHandler} />
          </div>
        </FilterBarItem>
      </MainFilters>
    </FilterBar>
  );
}

export default React.memo(EventFilter);
