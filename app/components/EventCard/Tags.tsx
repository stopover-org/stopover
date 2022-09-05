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
  background-color: #c2e0fe;
  border-radius: 3px;
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
  content: {
    tagName: string;
    image: string | undefined;
  }[];
};

const contentExist = (content: Props["content"]) =>
  typeof content !== undefined;
const imageExist = (image: string | undefined) =>
  typeof image === "string" && image !== "";

const Tags = ({ content }: Props) => (
  <Wrapper className="tags-wrapper">
    <TagsWrapper>
      {contentExist(content) &&
        content.map((item, index) => (
          <TagWrapper className="tag-wrapper" key={index}>
            <Tag>
              {imageExist(item.image) && (
                <Image src={item.image} alt={item.tagName} />
              )}
              <TagName>{item.tagName}</TagName>
            </Tag>
          </TagWrapper>
        ))}
    </TagsWrapper>
  </Wrapper>
);

export default Tags;
