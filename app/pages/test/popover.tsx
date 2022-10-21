import React, { useState } from "react";
import Layout from "../../components/MainPage/Layout";
import PopoverComponent from "../../components/Popover";
import { TypographyTags, TypographySize } from "../../components/StatesEnum";
import Typography from "../../components/Typography";

const Popover = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout>
      <PopoverComponent
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
      </PopoverComponent>
    </Layout>
  );
};

export default Popover;
