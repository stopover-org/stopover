import React from "react";
import styled from "styled-components";
import Row from "../Row";

const Wrapper = styled.div``;
const PageNumberWrapper = styled(Row)`
  border: 1px solid;
`;

const PageNumber = styled.button`
  background-color: #ff8a00;
  width: 75px;
  height: 75px;
  border: none;
  color: white;
  :hover {
    background-color: #ffab49;
    cursor: pointer;
  }
`;
type Props = {
  totalPages: number;
  currentPage: number;
  amountPagesOnLeft: number;
  amountPagesOnRight: number;
};

const Pagination = ({
  totalPages,
  currentPage,
  amountPagesOnLeft,
  amountPagesOnRight,
}: Props) => (
  <Wrapper>
    <PageNumberWrapper justifyContent="space-between">
      <PageNumber>Пред.</PageNumber>
      {new Array(amountPagesOnLeft).fill("").map((_, index) => (
        <PageNumber>{currentPage - amountPagesOnLeft + index}</PageNumber>
      ))}
      <PageNumber>{currentPage}</PageNumber>
      {new Array(amountPagesOnRight).fill("").map((_, index) => (
        <PageNumber>{currentPage + index + 1}</PageNumber>
      ))}
      <PageNumber>{totalPages}</PageNumber>
      <PageNumber>След.</PageNumber>
    </PageNumberWrapper>
  </Wrapper>
);

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
