import React, { useState, ReactNode } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import Search from "./Search";
import IndividualEvents from "./IndividualEvents";
import Slider from "./Slider";
import Calendar from "./Calander";
import Rate from "./Rate";
import Help from "./Help";
import PriceInput from "./PriceInput";

const FilterBar = styled.div``;

const MainFilters = styled.div`
  border-right: 1px solid black;
  padding: 0px 36px 30px 30px;
`;

const FilterBarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 30px 0px;
`;

const StartingPoint = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  padding: 0px 0px 244px 30px;
  //height: 156px;
  //margin: 0px 0px 63px 0px;
`;

const Separator = styled.div`
  padding: 0px 200px 30px 200px;
  border-top: 1px solid #d9d9d9;
`;

function EventFilter() {
  const [selectedDates, setSelectedDates] = useState<{
    startDate: moment.Moment | null;
    endDate: moment.Moment | null;
  }>({
    startDate: null,
    endDate: null,
  });

  const [selectedPrice, setSelectedPrice] = useState<{
    startPrice: number;
    endPrice: number;
  }>({
    startPrice: 0,
    endPrice: 10000,
  });

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

  const inputPriceHandler = (
    startPrice: number | null,
    endPrice: number | null
  ) => {
    console.log(startPrice, endPrice);
    /* setSelectedPrice({
      startPrice,
      endPrice,
    }) */
  };

  const sliderDateHandler = (
    startDate: Moment | ReactNode,
    endDate: Moment | ReactNode
  ) => {
    console.log(startDate, endDate);
  };

  const sliderPriceHandler = (startPrice: number, endPrice: number) => {
    console.log(startPrice, endPrice);
    setSelectedPrice({
      startPrice,
      endPrice,
    });
  };

  console.log(selectedRate, selectedIndividualOnly); // to silence husky
  return (
    <FilterBar>
      <StartingPoint>
        <Search
          searchType="location"
          inputWidth="372px"
          placeHolder="Напишите локацию"
          helpText="Вы выбрали"
        />
        <Calendar dateHandler={dateHandler} />
      </StartingPoint>
      <MainFilters>
        <FilterBarItem>
          <Help
            text="Выберите какие даты вы хотите просмотреть"
            content="Выберите дату"
          />
          <Slider
            range={[selectedDates.startDate!, selectedDates.endDate!]}
            handlePosition={[0, 0]}
            countOfMarks={4}
            onChange={sliderDateHandler}
          />
        </FilterBarItem>
        <Separator />
        <FilterBarItem>
          <Help
            text="Здесь вы можете выбрать цену слайдером или вводом"
            content="Выберите цену"
          />
          <Slider
            range={[0, 10000]}
            handlePosition={[selectedPrice.startPrice, selectedPrice.endPrice]}
            countOfMarks={4}
            onChange={sliderPriceHandler}
          />
          <PriceInput
            priceHandler={inputPriceHandler}
            startPrice={selectedPrice.startPrice}
            endPrice={selectedPrice.endPrice}
            maxPrice={10000}
            minPrice={0}
          />
        </FilterBarItem>
        <FilterBarItem>
          <IndividualEvents onClick={individualEventsHandler} />
        </FilterBarItem>
        <Separator />
        <FilterBarItem>
          <Rate onClick={rateHandler} />
        </FilterBarItem>
      </MainFilters>
    </FilterBar>
  );
}

export default React.memo(EventFilter);
