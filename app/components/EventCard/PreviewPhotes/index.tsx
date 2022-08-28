import React, { useState } from "react";
import styled from "styled-components";
import PhotoTrio from "./PhotoTrio";
import GalleryOfPhotes from "./GalleryOfPhotoes";

const Wrapper = styled.div``;

function PreviewPhotes() {
  const [gallery, setGallery] = useState<boolean>(false);
  const clickHandler = () => {
    console.log(gallery);
    setGallery(!gallery);
  };

  return (
    <Wrapper>
      {gallery ? <GalleryOfPhotes onClick={clickHandler} /> : ""}
      <PhotoTrio onClick={clickHandler} />
    </Wrapper>
  );
}

export default PreviewPhotes;
