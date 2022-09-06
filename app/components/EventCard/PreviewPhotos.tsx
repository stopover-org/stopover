import React, { useState } from "react";
import styled from "styled-components";
import PhotoTrio from "./PhotoTrio";
import PhotoGallery from "./PhotoGallery";

const Wrapper = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
`;

type Image = {
  name?: string;
  image: string;
  description: string;
  id: string;
};

type Props = {
  blockScroll: (fixed: boolean) => void;
  images: Image[];
};

const PreviewPhotos = ({ blockScroll, images }: Props) => {
  const [isOpenGallery, setIsOpenGallery] = useState<boolean>(false);
  blockScroll(isOpenGallery);
  return (
    <Wrapper>
      <PhotoGallery
        isOpen={isOpenGallery}
        images={images}
        onClose={() => setIsOpenGallery(false)}
      />
      <PhotoTrio
        images={[images[0].image, images[1].image, images[2].image]}
        onOpen={() => setIsOpenGallery(true)}
      />
    </Wrapper>
  );
};

export default PreviewPhotos;
