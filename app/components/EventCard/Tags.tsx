import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const TagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const TagWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Tag = styled.div`
  cursor: pointer;
  border-radius: 3px;
  border: 1px solid #c2e0fe;
  display: flex;
  flex-direction: row;
  padding: 6px;
`;

const TagName = styled.p`
  font-weight: 400;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
`;

const Image = styled.img`
  width: 25px;
  height: 25px;
`;

type Props = {
  tags: {
    id: string;
    title: string;
    preview: string | undefined;
  }[];
};

const contentExist = (tags: Props["tags"]) => typeof tags !== undefined;
const imageExist = (image: string | undefined) =>
  typeof image === "string" && image !== "";

const Tags = ({ tags }: Props) => (
  <Wrapper>
    <TagsWrapper>
      {contentExist(tags) &&
        tags.map((item, index) => (
          <TagWrapper key={index}>
            <Tag>
              {imageExist(item.preview) && (
                <Image src={item.preview} alt={item.title} />
              )}
              <TagName>{item.title}</TagName>
            </Tag>
          </TagWrapper>
        ))}
    </TagsWrapper>
  </Wrapper>
);

export default Tags;
