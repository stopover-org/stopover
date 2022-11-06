import React, { useState } from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import moment, { Moment } from "moment";
import Input from "../../Input";
import Typography from "../../Typography";
import Row from "../../Row";
import Column from "../../Column";
import Checkbox from "../../Checkbox";
import Popover from "../../Popover";
import Link from "../../Link";
import InputDate from "../../InputDate";
import CallenderIcon from "../../icons/Outline/General/Calendar.svg";
import ClockIcon from "../../icons/Outline/General/Clock.svg";
import { getTime } from "../../../lib/utils/dates";
import {
  InputSizes,
  CheckboxType,
  TypographySize,
  TypographyTags,
} from "../../StatesEnum";

const FormWrapper = styled(Column)`
  padding-top: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
`;

const InputPadding = styled.div`
  padding-bottom: 10px;
`;

const InputNamePadding = styled.div`
  padding-right: 10px;
`;

const OptionsWrapper = styled(Column)`
  padding: 10px;
`;

const CheckboxPadding = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
`;

const InputDatePadding = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const TypographyPadding = styled.div`
  padding-left: 10px;
`;

const LinkPadding = styled.div`
  padding-right: 10px;
`;

type AdditionalOptions = {
  text: string;
  price: string;
  currency: string;
};
type AllreadyInPrice = {
  text: string;
  price: string;
  currency: string;
};

type Props = {
  additionalOptions?: AdditionalOptions[];
  allreadyInPrice?: AllreadyInPrice[];
  date?: Moment | null;
  time?: Moment;
};

export const Form = ({
  additionalOptions,
  allreadyInPrice,
  date = null,
  time = moment("00:00"),
}: Props) => {
  const [checkbox, setCheckbox] = useState(false);
  const [isPoped, setIsPoped] = useState(false);
  return (
    <Row>
      <FormWrapper>
        <Row>
          <InputPadding>
            <InputNamePadding>
              <Input
                label={
                  <Typography
                    size={TypographySize.MEDIUM}
                    as={TypographyTags.MEDIUM}
                  >
                    name
                  </Typography>
                }
                size={InputSizes.MEDIUM}
              />
            </InputNamePadding>
          </InputPadding>
          <InputPadding>
            <Input
              label={
                <Typography
                  size={TypographySize.MEDIUM}
                  as={TypographyTags.MEDIUM}
                >
                  surname
                </Typography>
              }
              size={InputSizes.MEDIUM}
            />
          </InputPadding>
        </Row>
        <InputPadding>
          <Input
            label={
              <Typography
                size={TypographySize.MEDIUM}
                as={TypographyTags.MEDIUM}
              >
                E-mail
              </Typography>
            }
            size={InputSizes.MEDIUM}
          />
        </InputPadding>
        <InputPadding>
          <Input
            label={
              <Typography
                size={TypographySize.MEDIUM}
                as={TypographyTags.MEDIUM}
              >
                phone number
              </Typography>
            }
            size={InputSizes.MEDIUM}
          />
        </InputPadding>

        <Typography size={TypographySize.LARGE} as={TypographyTags.LARGE}>
          Дата и время мероприятия
        </Typography>
        <Row justifyContent="space-between">
          <InputDatePadding>
            <InputDate value={date} icon={CallenderIcon.src} disabled />
          </InputDatePadding>
          <InputDatePadding>
            <Input value={getTime(time)} icon={ClockIcon.src} disabled />
          </InputDatePadding>
        </Row>
        <Row container alignItems="end">
          <LinkPadding>
            <Link href="intrests/cancel" color="#BE0000">
              <Typography size={TypographySize.H5} as={TypographyTags.H5}>
                Отмена бронирования
              </Typography>
            </Link>
          </LinkPadding>
          <Popover
            isOpen={isPoped}
            component={
              <Typography size={TypographySize.SMALL} as={TypographyTags.SMALL}>
                Бесплатная отмена бронирования до 12:00 10 февраля <br />
                При отмене бронирования до 12:00 12 февраля штраф $50 <br />
                При отмене бронирования после 12:00 12 февраля отменить нельзя{" "}
                <br />
              </Typography>
            }
            onOpen={() => setIsPoped(true)}
            onClose={() => setIsPoped(false)}
          >
            <Row alignItems="end">
              <Typography size={TypographySize.H5} as={TypographyTags.H5}>
                Условия отмены бронирования
              </Typography>
            </Row>
          </Popover>
        </Row>
      </FormWrapper>

      <OptionsWrapper alignItems="start" justifyContent="start">
        <Typography size={TypographySize.LARGE} as={TypographyTags.LARGE}>
          Дополнительные опции
        </Typography>
        {additionalOptions &&
          additionalOptions.map((item, index) => (
            <CheckboxPadding key={index}>
              <Checkbox
                disabled // TODO: implement real functionality
                id={uuidv4()}
                checked={checkbox}
                type={CheckboxType.CHECKBOX}
                onClick={() => setCheckbox(!checkbox)}
              >
                <Row>
                  <TypographyPadding>
                    <Typography size={TypographySize.H4} as={TypographyTags.H4}>
                      {item.text}
                    </Typography>
                  </TypographyPadding>
                  <TypographyPadding>
                    <Typography size={TypographySize.H4} as={TypographyTags.H4}>
                      {item.price}
                    </Typography>
                  </TypographyPadding>
                  <Typography size={TypographySize.H4} as={TypographyTags.H4}>
                    {item.currency}
                  </Typography>
                </Row>
              </Checkbox>
            </CheckboxPadding>
          ))}

        <Typography size={TypographySize.LARGE} as={TypographyTags.LARGE}>
          Уже входит в стоимость
        </Typography>
        {allreadyInPrice &&
          allreadyInPrice.map((item, index) => (
            <CheckboxPadding key={index}>
              <Checkbox
                disabled // TODO: implement real functionality
                id={uuidv4()}
                checked={checkbox}
                type={CheckboxType.CHECKBOX}
                onClick={() => setCheckbox(!checkbox)}
              >
                <Row>
                  <TypographyPadding>
                    <Typography size={TypographySize.H4} as={TypographyTags.H4}>
                      {item.text}
                    </Typography>
                  </TypographyPadding>
                  <TypographyPadding>
                    <Typography
                      strikeThrough
                      size={TypographySize.H4}
                      as={TypographyTags.H4}
                    >
                      {item.price}
                    </Typography>
                  </TypographyPadding>
                  <Typography
                    strikeThrough
                    size={TypographySize.H4}
                    as={TypographyTags.H4}
                  >
                    {item.currency}
                  </Typography>
                </Row>
              </Checkbox>
            </CheckboxPadding>
          ))}
      </OptionsWrapper>
    </Row>
  );
};
export default React.memo(Form);
