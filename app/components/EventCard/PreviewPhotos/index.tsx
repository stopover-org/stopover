import React, { useState } from "react";
import styled from "styled-components";
import PhotoTrio from "./PhotoTrio";
import PhotoGallery from "./PhotoGallery";
import { imageArray } from "../../constants";

const Wrapper = styled.div`
  padding-top: 6px;
`;

const PreviewPhotos = () => {
  const [isOpenGallery, setIsOpenGallery] = useState<boolean>(false);

  return (
    <Wrapper>
      <PhotoGallery
        isOpen={isOpenGallery}
        onClose={() => setIsOpenGallery(false)}
        images={imageArray}
      />
      <PhotoTrio
        onOpen={() => setIsOpenGallery(true)}
        images={[
          "https://i.pinimg.com/564x/eb/a1/38/eba138faec79b8bd2629e99ad2612047.jpg",
          "https://i.pinimg.com/564x/eb/a1/38/eba138faec79b8bd2629e99ad2612047.jpg",
          "https://i.pinimg.com/564x/eb/a1/38/eba138faec79b8bd2629e99ad2612047.jpg",
        ]}
      />
    </Wrapper>
  );
};

export default PreviewPhotos;
