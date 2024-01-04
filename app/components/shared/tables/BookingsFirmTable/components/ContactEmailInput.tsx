import { useTranslation } from "react-i18next";
import React from "react";
import QueryInput from "../../../QueryInput/QueryInput";

const ContactEmailInput = () => {
  const { t } = useTranslation();

  return (
    <QueryInput
      queryName="contactEmail"
      label={t("models.booking.attributes.contactEmail")}
    />
  );
};

export default React.memo(ContactEmailInput);
