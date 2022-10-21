import React, { useState } from "react";
import Layout from "../../components/MainPage/Layout";
import PopoverComponent from "../../components/Popover";
import {
  PopoverSizes,
  TypographySize,
  TypographyTags,
} from "../../components/StatesEnum";
import Typography from "../../components/Typography";

const Popover = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Layout>
      <PopoverComponent
        component={
          <Typography size={TypographySize.H5} as={TypographyTags.H5}>
            <div style={{ width: "350px" }}>
              Бесплатная отмена бронирования до 12:00 10 февраля
              <br />
              При отмене бронирования до 12:00 12 февраля штраф $50
              <br />
              При отмене бронирования после 12:00 12 февраля отменить нельзя
            </div>
          </Typography>
        }
        isOpen={isOpen}
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
        size={PopoverSizes.MEDIUM}
      >
        <Typography size={TypographySize.H5} as={TypographyTags.H5}>
          Условия отмены бронирования
        </Typography>
      </PopoverComponent>
    </Layout>
  );
};

export default Popover;
