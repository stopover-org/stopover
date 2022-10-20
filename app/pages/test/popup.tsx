import React, { useState } from "react";
import Layout from "../../components/MainPage/Layout";
import PopupComponent from "../../components/Popup";
import { TypographyTags, TypographySize } from "../../components/StatesEnum";
import Typography from "../../components/Typography";

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout>
      <PopupComponent
        component={
          <Typography size={TypographySize.H5} as={TypographyTags.H5}>
            this is title
          </Typography>
        }
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        <Typography size={TypographySize.H5} as={TypographyTags.H5}>
          This is pop up
        </Typography>
      </PopupComponent>
    </Layout>
  );
};

export default Popup;
