import React from "react";
import styled from "styled-components";
import Typography from "../../components/Typography";
import Tag from "../../components/Tag";
import icon from "../../components/icons/Outline/Brands/Chrome.svg";
import {
  TypographyTags,
  TypographySize,
  TagSizes,
  TagType,
} from "../../components/StatesEnum";

const Wrapper = styled.div`
  width: 200px;
`;

const Tag1 = styled.div`
  width: 80px;
  padding-bottom: 10px;
`;

const Tag2 = styled.div`
  width: 272px;
`;

const TagsTest = () => (
  <Wrapper>
    <Tag1>
      <Tag
        size={TagSizes.SMALL}
        image={icon.src}
        content={<Typography>6 july</Typography>}
      />
    </Tag1>
    <Tag1>
      <Tag size={TagSizes.SMALL} content={<Typography>6 july</Typography>} />
    </Tag1>
    <Tag2>
      <Tag
        variant={TagType.OUTLINED}
        size={TagSizes.LARGE}
        imageSize="42px"
        image={icon.src}
        content={
          <Typography
            size={TypographySize.LARGE}
            as={TypographyTags.LARGE}
            fontWeight="400"
          >
            Great for two traveles
          </Typography>
        }
      />
    </Tag2>
  </Wrapper>
);

export default TagsTest;
