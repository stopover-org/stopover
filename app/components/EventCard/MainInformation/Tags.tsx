import React from "react";
import styled from "styled-components";

const Wrapper = styled.div``;
const TagsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;
const TagWrapper = styled.div`
  padding: 0px 6px 0px 6px;
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

function Tags(props: Props) {
  return (
    <Wrapper className="tags-wrapper">
      <TagsWrapper>
        {contentExist(props.content) &&
          props.content.map((item, index) => (
            <TagWrapper key={index}>
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
}

export default Tags;
/* (!!(props.shownTags as number[]).find(
              obj => {
                return obj === index+1
              }
            )) */
