import React from "react";
import styled from "styled-components";
import moment from "moment";
import Search from "./Search";
import Calendar from "./Calander";
import Help from "./Help";
import PriceInput from "./PriceInput";
import { NumericSlider, RangeType } from "./Slider/NumericSlider";
import DatesSlider from "./Slider/DatesSlider";

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
  minDate: moment.Moment;
  maxDate: moment.Moment;
  minPrice: number;
  maxPrice: number;
  city: string;
};

const EventFilter = ({
  minDate: minDateProp,
  maxDate: maxDateProp,
  minPrice,
  maxPrice,
  city,
}: Props) => {
  const [startPrice, setStartPrice] = React.useState<number>(minPrice);

  const [endPrice, setEndPrice] = React.useState<number>(maxPrice);

  const [startDate, setStartDate] = React.useState<moment.Moment | null>(null);

  const [endDate, setEndDate] = React.useState<moment.Moment | null>(null);

  const [minDate, setMinDate] = React.useState<moment.Moment | null>(
    minDateProp
  );

  const [maxDate, setMaxDate] = React.useState<moment.Moment | null>(
    maxDateProp
  );

  // TODO restore this functionality when backend will have this fields
  // const [selectedIndividualOnly, setSelectedIndividualOnly] =
  //   useState<boolean>(false);
  //
  // const [selectedRate, setSelectedRate] = useState<number>(0);
  //
  // const individualEventsHandler = (
  //   event: React.SyntheticEvent<HTMLInputElement>
  // ) => {
  //   if (event === null) throw new Error("check box returned null");
  //   setSelectedIndividualOnly(event.currentTarget.checked);
  // };
  //
  // const rateHandler = (rateIndex: number) => {
  //   setSelectedRate(rateIndex);
  // };

  const dateHandler = (
    newStartDate: moment.Moment | null,
    newEndDate: moment.Moment | null
  ) => {
    setMinDate(newStartDate);
    setMaxDate(newEndDate);
    setStartDate(newStartDate);
    setEndDate(newEndDate);
  };

  const inputPriceHandler = (newStartPrice: number, newEndPrice: number) => {
    setStartPrice(newStartPrice);
    setEndPrice(newEndPrice);
  };

  const sliderDateHandler = ([newStartDate, newEndDate]: [number, number]) => {
    setStartDate(moment(newStartDate * 1000));
    setEndDate(moment(newEndDate * 1000));
  };

  const sliderPriceHandler = (range: RangeType) => {
    setStartPrice(range[0]);
    setEndPrice(range[1]);
  };

  return (
    <FilterBar>
      <StartingPoint>
        <Search
          searchType="location"
          width="372px"
          placeHolder="Напишите локацию"
          helpText="Вы выбрали"
          value={city || ""}
        />
        <Calendar dateHandler={dateHandler} />
      </StartingPoint>
      <MainFilters>
        <FilterBarItem>
          <Help
            text="Выберите какие даты вы хотите просмотреть"
            content="Выберите дату"
          />
          {minDate && maxDate && startDate && endDate && (
            <DatesSlider
              min={minDate.unix()}
              max={maxDate.unix()}
              defaultValue={[minDate.unix(), maxDate.unix()]}
              value={[startDate.unix(), endDate.unix()]}
              stepsCount={4}
              onChange={sliderDateHandler}
            />
          )}
        </FilterBarItem>
        <Separator />
        <FilterBarItem>
          <Help
            text="Здесь вы можете выбрать цену слайдером или вводом"
            content="Выберите цену"
          />
          <NumericSlider
            min={minPrice}
            max={maxPrice}
            defaultValue={[minPrice, maxPrice]}
            value={[startPrice, endPrice]}
            stepsCount={4}
            onChange={sliderPriceHandler}
          />
          <PriceInput
            priceHandler={inputPriceHandler}
            startPrice={startPrice}
            endPrice={endPrice}
            maxPrice={maxPrice}
            minPrice={minPrice}
          />
        </FilterBarItem>
        {/* TODO restore this filters when backend will be ready */}
        {/* <FilterBarItem> */}
        {/*  <IndividualEvents onClick={individualEventsHandler} /> */}
        {/* </FilterBarItem> */}
        {/* <Separator /> */}
        {/* <FilterBarItem> */}
        {/*  <Rate onClick={rateHandler} /> */}
        {/* </FilterBarItem> */}
      </MainFilters>
    </FilterBar>
  );
};

export default React.memo(EventFilter);
