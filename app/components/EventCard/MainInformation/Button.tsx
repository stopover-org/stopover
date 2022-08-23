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

  border-right: 3px solid #893aad6e;
  border-bottom: 3px solid #893aad6e;
  &:hover {
    background: linear-gradient(#ff961f, #ff8a00);
    transition: ease-in-out 1s;
  }
`;
const Inscription = styled.div`
  font-weight: 400;
  font-size: 28px;
  line-height: 34px;
`;
const ContentAfterInscriptionStyle = styled.div`
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
  contentAfterInscription?: Array<JSX.Element | number | string | undefined>;
  inscription: string | Moment | number;
};

const arrayExist = (item: Props["contentAfterInscription"]) => !!item;
const arrayIsEmpty = (item: Props["contentAfterInscription"]) =>
  item?.length === 0;
const isMoment = (item: Props["inscription"]) => item instanceof moment;
const dateIsValid = (item: Props["inscription"]) => (item as Moment).isValid();
const isString = (item: Props["inscription"]) => typeof item === "string";
const isNumber = (item: Props["inscription"]) => typeof item === "number";

function Button({ contentAfterInscription, inscription }: Props) {
  return (
    <Wrapper className="button-wrapper">
      <ButtonStyle>
        {(isString(inscription) || isNumber(inscription)) && (
          <Inscription>{inscription as string | number}</Inscription>
        )}
        {isMoment(inscription) && dateIsValid(inscription) && (
          <Inscription>
            {(inscription as Moment).format("DD.MM.YY")}
          </Inscription>
        )}
        {arrayExist(contentAfterInscription) &&
          !arrayIsEmpty(contentAfterInscription) &&
          (contentAfterInscription as []).map((item, index) => (
            <ContentAfterInscriptionStyle key={index}>
              {item}
            </ContentAfterInscriptionStyle>
          ))}
      </ButtonStyle>
    </Wrapper>
  );
}

export default Button;
