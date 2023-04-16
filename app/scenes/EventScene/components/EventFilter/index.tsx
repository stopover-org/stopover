import React from "react";
import styled from "styled-components";
import moment from "moment";
import { graphql, useFragment } from "react-relay";
import Search from "./Search";
import Calendar from "./Calander";
import Help from "./Help";
import PriceInput from "./PriceInput";
import { NumericSlider, RangeType } from "./Slider/NumericSlider";
import DatesSlider from "./Slider/DatesSlider";
import { EventFilter_EventFiltersFragment$key } from "./__generated__/EventFilter_EventFiltersFragment.graphql";
import Column from "../../../../components/Layout/Column";

const MainFilters = styled.div`
  padding: 5px 12px 30px 0px;
  border-right: 1px solid;
`;

const FilterBarItem = styled(Column)`
  padding: 0px 12px 30px 0px;
`;

const StartingPoint = styled(Column)`
  padding: 0px 0px 30px 0px;
`;

const Separator = styled.div`
  padding-bottom: 30px;
  margin-right: 30px;
  border-top: 1px solid #d9d9d9;
`;

export type ChangeFiltersProps = {
  startDate: moment.Moment | null;
  endDate: moment.Moment | null;
  minDate: moment.Moment | null;
  maxDate: moment.Moment | null;
  minPrice: number;
  maxPrice: number;
  city: string;
};

type Props = {
  eventFiltersRef: EventFilter_EventFiltersFragment$key;
  onChange: (filters: ChangeFiltersProps) => void;
};

const EventFilter = ({ onChange, eventFiltersRef }: Props) => {
  const {
    startDate: minDateProp,
    endDate: maxDateProp,
    minPrice,
    maxPrice,
    city,
  } = useFragment(
    graphql`
      fragment EventFilter_EventFiltersFragment on EventFilters {
        startDate
        endDate
        minPrice {
          cents
        }
        maxPrice {
          cents
        }
        city
      }
    `,
    eventFiltersRef
  );
  const [location, setLocation] = React.useState<string>(city || "");
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
  const [timerId, setTimerId] = React.useState<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }

    const _timerId = setTimeout(() => {
      onChange({
        startDate,
        endDate,
        minDate,
        maxDate,
        minPrice: startPrice,
        maxPrice: endPrice,
        city: location || "",
      });

      setTimerId(null);
    }, 500);

    setTimerId(_timerId);

    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [location, startPrice, endPrice, startDate, endDate, maxDate, minDate]);

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
    <div>
      <StartingPoint justifyContent="space-between">
        <Search
          searchType="location"
          width="300px"
          placeHolder="Напишите локацию"
          helpText="Вы выбрали"
          value={location || ""}
          onChange={setLocation}
        />
        <Calendar dateHandler={dateHandler} />
      </StartingPoint>
      <MainFilters>
        <FilterBarItem alignItems="flex-start">
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
      </MainFilters>
    </div>
  );
};

export default React.memo(EventFilter);
