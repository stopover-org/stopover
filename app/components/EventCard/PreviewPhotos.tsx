import React, { useState } from "react";
import styled from "styled-components";
import PhotoTrio from "./PhotoTrio";
import PhotoGallery from "./PhotoGallery";
import { imageArray } from "../constants";

const Wrapper = styled.div`
  padding-top: 6px;
`;

type Props = {
  blockScroll: (fixed: boolean) => void;
};

const PreviewPhotos = ({ blockScroll }: Props) => {
  const [isOpenGallery, setIsOpenGallery] = useState<boolean>(false);
  blockScroll(isOpenGallery);
  return (
    <Wrapper>
      <PhotoGallery
        isOpen={isOpenGallery}
        images={imageArray}
        onClose={() => setIsOpenGallery(false)}
      />
      <PhotoTrio
        images={[
          "https://i.pinimg.com/564x/eb/a1/38/eba138faec79b8bd2629e99ad2612047.jpg",
          "https://i.pinimg.com/564x/eb/a1/38/eba138faec79b8bd2629e99ad2612047.jpg",
          "https://i.pinimg.com/564x/eb/a1/38/eba138faec79b8bd2629e99ad2612047.jpg",
        ]}
        onOpen={() => setIsOpenGallery(true)}
      />
    </Wrapper>
  );
};

export default PreviewPhotos;
