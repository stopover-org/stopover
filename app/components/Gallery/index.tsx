import React from "react";
import styled from "styled-components";
import Column from "../Column";
import Row from "../Row";
import Typography from "../Typography";
import { TypographyTags } from "../StatesEnum";

const Frame = styled(Column)<{ width: string }>`
  width: ${(props) => props.width};
  position: relative;
`;

const Wrapper = styled(Row)<{ overflow: string }>`
  overflow-y: ${(props) => props.overflow};
`;
const Shot = styled(Column)``;
const Img = styled.img`
  width: 100%;
`;
const Title = styled(Row)``;
const BtnWrapper = styled(Row)`
  position: absolute;
  bottom: 0px;
  width: 100%;
`;

const BtnClick = styled.button`
  width: 225px;
  height: 40px;
  padding-top: 8px;
  border: 1px solid #888;
  border-radius: 5px;
  cursor: pointer;
  background-color: #000;
  color: #fff;
  opacity: 0.8;
  display: flex;
  justify-content: center;
`;

export type GalleryProps = {
  opened: boolean;
  onOpen: () => void;
  onClose: () => void;
  images: Array<{ src: string; title?: string }>;
  minHeight: string;
  maxHeight: string;
  width: string;
  numberInRow: number;
};

const Gallery = ({
  opened = false,
  onOpen,
  onClose,
  images,
  minHeight = "600px",
  maxHeight = "none",
  width,
  numberInRow = 2,
}: GalleryProps) => {
  const clickHandler = () => {
    if (opened) {
      onClose();
    } else {
      onOpen();
    }
  };

  return (
    <Frame width={width}>
      <Wrapper
        justifyContent="space-between"
        wrap="wrap"
        height={opened ? maxHeight : minHeight}
        overflow={!opened ? "hidden" : "auto"}
      >
        {images.map((image, i) => (
          <Shot
            key={image.src + i}
            alignItems="flex-end"
            width={`${Math.floor(100 / numberInRow) - 0.4}%`}
          >
            <Img src={image.src} />
            <Title justifyContent="center">
              <Typography size="16px" as={TypographyTags.DIV}>
                {image.title}
              </Typography>
            </Title>
          </Shot>
        ))}
      </Wrapper>
      <BtnWrapper justifyContent="center">
        <BtnClick onClick={clickHandler}>
          <Typography size="16px" as={TypographyTags.DIV}>
            {!opened ? "I want to see more" : "roll up"}
          </Typography>
        </BtnClick>
      </BtnWrapper>
    </Frame>
  );
};

export default Gallery;
