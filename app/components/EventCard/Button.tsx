import moment, { Moment } from "moment";
import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const ButtonStyle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background-color: #ff8a00;
  border-radius: 3px;
  padding: 10px;
  &:hover {
    background: linear-gradient(#ff961f, #ff8a00);
    transition: ease-in-out 1s;
  }
`;
const Description = styled.div`
  font-weight: 400;
  font-size: 28px;
  line-height: 34px;
`;
const ContentAfterDescriptionStyle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 10px;
  font-weight: 400;
  font-size: 28px;
  line-height: 34px;
  width: 25px;
  height: 25px;
`;
type Props = {
  contentAfterDescription?: Array<JSX.Element | number | string | undefined>;
  description: string | Moment | number;
};

const arrayExist = (item: Props["contentAfterDescription"]) => !!item;
const arrayIsEmpty = (item: Props["contentAfterDescription"]) =>
  item?.length === 0;
const isMoment = (item: Props["description"]) => item instanceof moment;
const dateIsValid = (item: Props["description"]) => (item as Moment).isValid();
const isString = (item: Props["description"]) => typeof item === "string";
const isNumber = (item: Props["description"]) => typeof item === "number";
const couldBeAValidMoment = (item: Props["description"]) =>
  moment(item, "DD.MM.YY").isValid();

const Button = ({ contentAfterDescription, description }: Props) => {
  if (
    !isMoment(description) &&
    !isString(description) &&
    !isNumber(description) &&
    !couldBeAValidMoment(description) &&
    !arrayExist(contentAfterDescription)
  )
    return null;
  return (
    <Wrapper className="button-wrapper">
      <ButtonStyle>
        {isString(description) && couldBeAValidMoment(description) && (
          <Description>
            {moment(description, "DD.MM.YY").format("DD MMMM YYYY")}
          </Description>
        )}
        {!isString(description) &&
          isMoment(description) &&
          dateIsValid(description) && (
            <Description>
              {(description as Moment).format("DD MMMM YYYY")}
            </Description>
          )}
        {(isString(description) || isNumber(description)) &&
          !couldBeAValidMoment(description) && (
            <Description>{description as string | number}</Description>
          )}
        {arrayExist(contentAfterDescription) &&
          !arrayIsEmpty(contentAfterDescription) &&
          (contentAfterDescription as []).map((item, index) => (
            <ContentAfterDescriptionStyle key={index}>
              {item}
            </ContentAfterDescriptionStyle>
          ))}
      </ButtonStyle>
    </Wrapper>
  );
};

export default Button;
