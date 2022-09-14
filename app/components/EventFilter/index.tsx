import React, { useState, ReactNode } from "react";
import styled from "styled-components";
import moment, { Moment } from "moment";
import Search from "./Search";
import IndividualEvents from "./IndividualEvents";
import Slider from "./Slider";
import Calendar from "./Calander";
import Rate from "../Rate";
import Help from "./Help";
import PriceInput from "./PriceInput";
import NumericSlider from "./Slider/NumericSlider";

const FilterBar = styled.div``;

const MainFilters = styled.div`
  padding: 0px 36px 30px 30px;
  margin-right: 56px;
  padding-left: 30px; //top right bottom left
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
`;

const Separator = styled.div`
  padding: 0px 200px 30px 200px;
  border-top: 1px solid #d9d9d9;
`;

type Props = {
  startDate: Date;
  endDate: Date;
  minPrice: number;
  maxPrice: number;
  city: string
}

const EventFilter = ({ startDate, endDate, minPrice, maxPrice, city }: Props) => {
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
    startPrice: minPrice,
    endPrice: maxPrice,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedIndividualOnly, setSelectedIndividualOnly] =
    useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedRate, setSelectedRate] = useState<number>(0);

  const individualEventsHandler = (
    event: React.SyntheticEvent<HTMLInputElement>
  ) => {
    if (event === null) throw new Error("check box returned null");
    setSelectedIndividualOnly(event.currentTarget.checked);
  };

  const rateHandler = (rateIndex: number) => {
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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    startPrice: number | null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endPrice: number | null
  ) => {
    setSelectedPrice({
      startPrice: startPrice!,
      endPrice: endPrice!,
    });
  };

  const sliderDateHandler = (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    startDate: Moment | ReactNode,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    endDate: Moment | ReactNode
  ) => {};

  const sliderPriceHandler = (startPrice: number, endPrice: number) => {
    setSelectedPrice({
      startPrice,
      endPrice,
    });
  };

  console.log(selectedPrice, selectedDates)

  return (
    <FilterBar>
      <StartingPoint>
        <Search
          searchType="location"
          inputWidth="372px"
          placeHolder="Напишите локацию"
          helpText="Вы выбрали"
          value={city}
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
            range={[moment(startDate), moment(endDate)]}
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
          <NumericSlider
            min={1000}
            max={3000}
            value={[1300, 2500]}
            stepsCount={4}
          />
          <PriceInput
            priceHandler={inputPriceHandler}
            startPrice={selectedPrice.startPrice}
            endPrice={selectedPrice.endPrice}
            maxPrice={maxPrice}
            minPrice={minPrice}
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
};

export default React.memo(EventFilter);
