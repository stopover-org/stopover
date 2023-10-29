import { Grid, Option, Sheet } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import Select from "../v2/Select";

const Footer = () => {
  const { t, i18n } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(["i18next"]);
  const setLanguage = React.useCallback(
    (language: string) => {
      i18n.changeLanguage(language);

      setCookie("i18next", language);

      const w = window as any;

      w.location.reload();
    },
    [setCookie, i18n]
  );
  return (
    <Sheet sx={{ minHeight: "100px" }}>
      <Grid container>
        <Grid md={4} sm={12} padding={4} />
        <Grid md={4} sm={12} padding={4} />
        <Grid md={4} sm={12} padding={4}>
          <Select
            placeholder={t("languages.action")}
            name={i18n.language}
            sx={{ maxWidth: 200 }}
            onChange={setLanguage}
            value={cookies.i18next}
          >
            <Option value="ru">{t("languages.russian")}</Option>
            <Option value="en">{t("languages.english")}</Option>
          </Select>
        </Grid>
      </Grid>
    </Sheet>
  );
};

export default Footer;
