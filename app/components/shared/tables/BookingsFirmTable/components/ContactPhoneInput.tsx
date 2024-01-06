import { useTranslation } from "react-i18next";
import React from "react";
import QueryInput from "../../../QueryInput/QueryInput";

const ContactPhoneInput = () => {
  const { t } = useTranslation();

  return (
    <QueryInput
      size="sm"
      queryName="contactPhone"
      label={t("models.booking.attributes.contactPhone")}
    />
  );
};

export default React.memo(ContactPhoneInput);
