import React, { useState } from "react";
import styled from "styled-components";
import { graphql, useFragment } from "react-relay";
import GalleryPreview from "../Gallery/GalleryPreview";
import Gallery from "../Gallery/Gallery";

const Wrapper = styled.div`
  padding-top: 6px;
  padding-bottom: 6px;
`;

type Props = {
  blockScroll: (fixed: boolean) => void;
  eventFragmentRef: any;
};

const EventPreview = ({ blockScroll, eventFragmentRef }: Props) => {
  const data = useFragment(
    graphql`
      fragment EventPreviewapp/controllers/admin/events_controller.rb:7:in_EventFragment on Event {
        images
      }
    `,
    eventFragmentRef
  );
  const [isOpenGallery, setIsOpenGallery] = useState<boolean>(false);

  blockScroll(isOpenGallery);
  return (
    <Wrapper>
      <Gallery
        isOpen={isOpenGallery}
        images={data.images}
        onClose={() => setIsOpenGallery(false)}
      />
      <GalleryPreview
        images={data?.images?.slice(0, 2)}
        onOpen={() => setIsOpenGallery(true)}
      />
    </Wrapper>
  );
};

export default EventPreview;
