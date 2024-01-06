import { useTranslation } from "react-i18next";
import React from "react";
import QueryInput from "components/shared/QueryInput";

const ContactPhoneInput = () => {
  const { t } = useTranslation();

  return (
    <QueryInput
      placeholder={t("placeholders.bookings.contactPhone")}
      size="sm"
      queryName="contactPhone"
      label={t("models.booking.attributes.contactPhone")}
    />
  );
};

export default React.memo(ContactPhoneInput);
