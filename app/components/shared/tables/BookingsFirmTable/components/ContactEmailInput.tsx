import { useTranslation } from "react-i18next";
import React from "react";
import QueryInput from "components/shared/QueryInput";

const ContactEmailInput = () => {
  const { t } = useTranslation();

  return (
    <QueryInput
      placeholder={t("placeholders.bookings.contactEmail")}
      size="sm"
      queryName="contactEmail"
      label={t("models.booking.attributes.contactEmail")}
    />
  );
};

export default React.memo(ContactEmailInput);
