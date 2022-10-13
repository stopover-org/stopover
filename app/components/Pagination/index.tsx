import React from "react";
import styled from "styled-components";
import Row from "../Row";
import Column from "../Column";
import Typography from "../Typography";
import { TypographyTags, PaginationSize } from "../StatesEnum";

const PageNumberWrapper = styled(Row)``;
const PageNumber = styled(Column)<{ size: string }>`
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
const SFiller = styled(Column)``;
const DisabledElement = styled(Column)<{ size: string }>`
  border: 1px solid #9d9d9d;
  border-radius: 3px;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  color: black;
`;

const DisabledChoosen = styled(Column)<{ size: string }>`
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
}: Props) => {
  if (disabled)
    return (
      <PageNumberWrapper justifyContent="space-between">
        {prevNextElementVisible && (
          <DisabledElement size={size}>
            <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
              {prevElement}
            </Typography>
          </DisabledElement>
        )}

        {minVisible && (
          <DisabledElement size={size}>
            <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
              1
            </Typography>
          </DisabledElement>
        )}

        {fillerVisible && (
          <SFiller justifyContent="end" height={size} width="auto">
            <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
              {fillerElement}
            </Typography>
          </SFiller>
        )}

        {new Array(amountPagesOnLeft).fill("").map((_, index) => (
          <DisabledElement size={size}>
            <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
              {currentPage - amountPagesOnLeft + index}
            </Typography>
          </DisabledElement>
        ))}

        <DisabledChoosen size={size}>
          <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
            {currentPage}
          </Typography>
        </DisabledChoosen>

        {new Array(amountPagesOnRight).fill("").map((_, index) => (
          <DisabledElement size={size}>
            <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
              {currentPage + index + 1}
            </Typography>
          </DisabledElement>
        ))}

        {fillerVisible && (
          <SFiller justifyContent="end" height={size} width="auto">
            <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
              {fillerElement}
            </Typography>
          </SFiller>
        )}

        {maxVisible && (
          <DisabledElement size={size}>
            <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
              {totalPages}
            </Typography>
          </DisabledElement>
        )}

        {prevNextElementVisible && (
          <DisabledElement size={size}>
            <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
              {nextElement}
            </Typography>
          </DisabledElement>
        )}
      </PageNumberWrapper>
    );

  return (
    <PageNumberWrapper justifyContent="space-between">
      {prevNextElementVisible && (
        <PrevElement size={size}>
          <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
            {prevElement}
          </Typography>
        </PrevElement>
      )}

      {minVisible && (
        <PageNumber size={size}>
          <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
            1
          </Typography>
        </PageNumber>
      )}

      {fillerVisible && (
        <SFiller justifyContent="end" height={size} width="auto">
          <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
            {fillerElement}
          </Typography>
        </SFiller>
      )}

      {new Array(amountPagesOnLeft).fill("").map((_, index) => (
        <PageNumber size={size}>
          <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
            {currentPage - amountPagesOnLeft + index}
          </Typography>
        </PageNumber>
      ))}

      <Choosen size={size}>
        <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
          {currentPage}
        </Typography>
      </Choosen>

      {new Array(amountPagesOnRight).fill("").map((_, index) => (
        <PageNumber size={size}>
          <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
            {currentPage + index + 1}
          </Typography>
        </PageNumber>
      ))}

      {fillerVisible && (
        <SFiller justifyContent="end" height={size} width="auto">
          <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
            {fillerElement}
          </Typography>
        </SFiller>
      )}

      {maxVisible && (
        <PageNumber size={size}>
          <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
            {totalPages}
          </Typography>
        </PageNumber>
      )}

      {prevNextElementVisible && (
        <NextElement size={size}>
          <Typography fontWeight="400" as={TypographyTags.LARGE} size="20px">
            {nextElement}
          </Typography>
        </NextElement>
      )}
    </PageNumberWrapper>
  );
};

export default React.memo(Pagination);
/*

import React, { useState } from "react";
import styled from "styled-components";
import Row from "../Row";
import Column from "../Column";

const Wrapper = styled.div`

`;
const Posts = styled(Column)`

`;
const PageNumberWrapper = styled(Row)`
    border: 1px solid;
`;
const PageNumber = styled.button`

    background-color: #FF8A00;
    width: 75px;
    height: 75px;
    border: none;
    color: white;
    :hover{
        background-color: #FFAB49;
        cursor: pointer;
    }
`;
type Props = {
    posts: React.ReactElement[];
    postsPerPage?: number;
}

const countPages = (posts: Props["posts"], postsPerPage: number) => Math.ceil(posts.length / postsPerPage);

const Pagination = ({posts, postsPerPage = 3}: Props) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [statePostsPerPage, setStatePostPerPage] = useState(postsPerPage);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = posts.slice(firstPostIndex, lastPostIndex);
    console.log(countPages(posts, postsPerPage));
    return (
        <Wrapper>
            <Posts>
                {currentPosts}
            </Posts>
            <PageNumberWrapper justifyContent="space-between">
                <PageNumber>
                    След.
                </PageNumber>
                {
                    new Array(countPages(posts, postsPerPage)).fill("").map((_, index) => {
                        return(
                            <PageNumber>
                                {index}
                            </PageNumber>
                        )
                    })
                }
                <PageNumber>
                    Пред.
                </PageNumber>
            </PageNumberWrapper>
        </Wrapper>
    );
};

export default React.memo(Pagination);











*/
