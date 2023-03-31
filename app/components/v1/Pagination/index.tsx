import React from "react";
import styled from "styled-components";
import Row from "../../Layout/Row";
import Column from "../../Layout/Column";
import Typography from "../Typography";
import { PaginationSize, TypographyTags } from "../../StatesEnum";

const PageNumber = styled(Column)<{ size: string }>`
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid #ff8a00;
  border-radius: 3px;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  color: black;
  :hover {
    background-color: #ff8a00;
    color: white;
    cursor: pointer;
  }
`;

const Choosen = styled(Column)<{ size: string }>`
  margin-right: 10px;
  margin-left: 10px;
  background-color: #ff8a00;
  border-radius: 3px;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  color: white;
  :hover {
    background-color: #ffab49;
    cursor: pointer;
  }
`;

const PrevElement = styled(Column)<{ size: string }>`
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid #ff8a00;
  border-radius: 3px;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  color: black;
  :hover {
    background-color: #ff8a00;
    color: white;
    cursor: pointer;
  }
`;

const NextElement = styled(Column)<{ size: string }>`
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid #ff8a00;
  border-radius: 3px;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  color: black;
  :hover {
    background-color: #ff8a00;
    color: white;
    cursor: pointer;
  }
`;

const SFiller = styled(Column)`
  margin-right: 10px;
  margin-left: 10px;
  width: 55px;
  height: 55px;
`;

const DisabledElement = styled(Column)<{ size: string }>`
  border: 1px solid #9d9d9d;
  border-radius: 3px;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  color: black;
`;

const DisabledChoosen = styled(Column)<{ size: string }>`
  margin-right: 10px;
  margin-left: 10px;
  background-color: #9d9d9d;
  border-radius: 3px;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  color: white;
`;

type Props = {
  totalPages: number;
  currentPage: number;
  amountPagesOnLeft?: number;
  amountPagesOnRight?: number;
  prevElement?: React.ReactElement | string;
  nextElement?: React.ReactElement | string;
  maxVisible?: boolean;
  minVisible?: boolean;
  fillerElement?: React.ReactElement | string;
  fillerVisible?: boolean;
  disabled?: boolean;
  prevNextElementVisible?: boolean;
  size?: PaginationSize;
  onNextPage: () => void;
  onPrevPage: () => void;
  onSelectPage: (page: number) => void;
};

const Pagination = ({
  totalPages,
  currentPage,
  amountPagesOnLeft = 0,
  amountPagesOnRight = 0,
  prevElement = "<",
  nextElement = ">",
  maxVisible,
  minVisible,
  fillerElement = "...",
  fillerVisible,
  disabled,
  prevNextElementVisible,
  size = PaginationSize.MEDIUM,
  onNextPage,
  onPrevPage,
  onSelectPage,
}: Props) => {
  const additionalElements = 2; // additional elements in paggination like filler, arrows ... Made to maintain consistency in spacing
  const calculatePagesOnRight = () => {
    if (currentPage <= amountPagesOnRight)
      return (
        amountPagesOnRight +
        amountPagesOnLeft -
        currentPage +
        additionalElements
      );
    return amountPagesOnRight;
  };

  const calculatePagesOnLeft = () => {
    if (currentPage >= totalPages - amountPagesOnRight)
      return (
        amountPagesOnLeft + amountPagesOnRight - (totalPages - currentPage)
      );
    return amountPagesOnLeft;
  };
  if (disabled)
    return (
      // TODO: add knew functions to desable
      <Row justifyContent="space-between">
        {prevNextElementVisible && (
          <DisabledElement
            size={size}
            alignItems="center"
            justifyContent="center"
          >
            <Typography as={TypographyTags.LARGE} size="20px">
              {prevElement}
            </Typography>
          </DisabledElement>
        )}

        {minVisible && (
          <DisabledElement
            size={size}
            alignItems="center"
            justifyContent="center"
          >
            <Typography as={TypographyTags.LARGE} size="20px">
              1
            </Typography>
          </DisabledElement>
        )}

        {fillerVisible && (
          <SFiller
            justifyContent="end"
            height={size}
            width="auto"
            alignItems="center"
          >
            <Typography as={TypographyTags.LARGE} size="20px">
              {fillerElement}
            </Typography>
          </SFiller>
        )}

        {new Array(amountPagesOnLeft).fill("").map((_, index) => (
          <DisabledElement
            size={size}
            alignItems="center"
            justifyContent="center"
          >
            <Typography as={TypographyTags.LARGE} size="20px">
              {currentPage - amountPagesOnLeft + index}
            </Typography>
          </DisabledElement>
        ))}

        <DisabledChoosen
          size={size}
          alignItems="center"
          justifyContent="center"
        >
          <Typography as={TypographyTags.LARGE} size="20px">
            {currentPage}
          </Typography>
        </DisabledChoosen>

        {new Array(amountPagesOnRight).fill("").map((_, index) => (
          <DisabledElement
            size={size}
            alignItems="center"
            justifyContent="center"
          >
            <Typography as={TypographyTags.LARGE} size="20px">
              {currentPage + index + 1}
            </Typography>
          </DisabledElement>
        ))}

        {fillerVisible && (
          <SFiller
            justifyContent="end"
            height={size}
            width="auto"
            alignItems="center"
          >
            <Typography as={TypographyTags.LARGE} size="20px">
              {fillerElement}
            </Typography>
          </SFiller>
        )}

        {maxVisible && (
          <DisabledElement
            size={size}
            alignItems="center"
            justifyContent="center"
          >
            <Typography as={TypographyTags.LARGE} size="20px">
              {totalPages}
            </Typography>
          </DisabledElement>
        )}

        {prevNextElementVisible && (
          <DisabledElement
            size={size}
            alignItems="center"
            justifyContent="center"
          >
            <Typography as={TypographyTags.LARGE} size="20px">
              {nextElement}
            </Typography>
          </DisabledElement>
        )}
      </Row>
    );

  return (
    <Row justifyContent="center">
      {prevNextElementVisible && currentPage !== 1 && (
        <PrevElement
          size={size}
          onClick={onPrevPage}
          alignItems="center"
          justifyContent="center"
        >
          <Typography as={TypographyTags.LARGE} size="20px">
            {prevElement}
          </Typography>
        </PrevElement>
      )}

      {minVisible && currentPage > amountPagesOnLeft + 1 && (
        <PageNumber
          size={size}
          onClick={() => onSelectPage(1)}
          alignItems="center"
          justifyContent="center"
        >
          <Typography as={TypographyTags.LARGE} size="20px">
            1
          </Typography>
        </PageNumber>
      )}

      {fillerVisible && currentPage > amountPagesOnLeft + 2 && (
        <SFiller
          justifyContent="end"
          height={size}
          width="auto"
          alignItems="center"
        >
          <Typography as={TypographyTags.LARGE} size="20px">
            {fillerElement}
          </Typography>
        </SFiller>
      )}

      {new Array(calculatePagesOnLeft()).fill("").map((_, index) => {
        if (currentPage - amountPagesOnLeft + index > 0) {
          return (
            <PageNumber
              key={index}
              size={size}
              onClick={() =>
                onSelectPage(currentPage - calculatePagesOnLeft() + index)
              }
              alignItems="center"
              justifyContent="center"
            >
              <Typography as={TypographyTags.LARGE} size="20px">
                {currentPage + index - calculatePagesOnLeft()}
              </Typography>
            </PageNumber>
          );
        }
        return null;
      })}

      <Choosen size={size} alignItems="center" justifyContent="center">
        <Typography as={TypographyTags.LARGE} size="20px">
          {currentPage}
        </Typography>
      </Choosen>

      {new Array(calculatePagesOnRight()).fill("").map((_, index) => {
        if (currentPage + index < totalPages) {
          return (
            <PageNumber
              key={index}
              size={size}
              onClick={() => onSelectPage(currentPage + index + 1)}
              alignItems="center"
              justifyContent="center"
            >
              <Typography as={TypographyTags.LARGE} size="20px">
                {currentPage + index + 1}
              </Typography>
            </PageNumber>
          );
        }
        return null;
      })}

      {fillerVisible && currentPage < totalPages - amountPagesOnRight - 1 && (
        <SFiller
          justifyContent="end"
          height={size}
          width="auto"
          alignItems="center"
        >
          <Typography as={TypographyTags.LARGE} size="20px">
            {fillerElement}
          </Typography>
        </SFiller>
      )}

      {maxVisible && currentPage < totalPages - amountPagesOnRight && (
        <PageNumber
          size={size}
          onClick={() => onSelectPage(totalPages)}
          alignItems="center"
          justifyContent="center"
        >
          <Typography as={TypographyTags.LARGE} size="20px">
            {totalPages}
          </Typography>
        </PageNumber>
      )}

      {prevNextElementVisible && currentPage !== totalPages && (
        <NextElement
          size={size}
          onClick={onNextPage}
          alignItems="center"
          justifyContent="center"
        >
          <Typography as={TypographyTags.LARGE} size="20px">
            {nextElement}
          </Typography>
        </NextElement>
      )}
    </Row>
  );
};

export default React.memo(Pagination);
