import { Grid, Option, Sheet, Stack } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import Select from "components/v2/Select";
import Link from "components/v2/Link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Footer = () => {
  const { t, i18n } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(["i18next"]);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const queryLanguage = searchParams.get("language");
  const setLanguage = React.useCallback(
    (language: string) => {
      i18n.changeLanguage(language);

      setCookie("i18next", language);

      const params = new URLSearchParams(searchParams.toString());
      params.set("language", language);

      router.push(`${pathname}?${params.toString()}`);
    },
    [setCookie, i18n]
  );

  return (
    <Sheet sx={{ minHeight: "100px", zIndex: "-1" }}>
      <Grid container>
        <Grid md={4} sm={12} padding={4}>
          <Stack
            direction="column"
            alignItems={{
              sx: "center",
              sm: "center",
              md: "flex-end",
              lg: "flex-end",
            }}
          >
            <Link href="/pages/privacy">{t("general.privacy")}</Link>
            <Link href="/pages/refund-terms">{t("general.refundTerms")}</Link>
            <Link href="/pages/terms">{t("general.termsOfUsage")}</Link>
          </Stack>
        </Grid>
        <Grid md={4} sm={12} padding={4}>
          <Stack
            direction="column"
            alignItems={{
              sx: "center",
              sm: "center",
              md: "center",
              lg: "center",
            }}
          >
            <Link href="/firms/landing">{t("general.whatDoWeOffer")}</Link>
            <Link href="/firms/workflow">{t("general.firmWorkflow")}</Link>
            <Link href="https://stopoverx.com/firms/ZmlybXMtMQ==">
              {t("general.contacts")}
            </Link>
          </Stack>
        </Grid>
        <Grid md={4} sm={12} padding={4}>
          <Stack
            direction="column"
            alignItems={{
              sx: "center",
              sm: "center",
              md: "flex-start",
              lg: "flex-start",
            }}
          >
            <Select
              placeholder={t("languages.action")}
              name={queryLanguage || i18n.language || "en"}
              sx={{ maxWidth: 200 }}
              onChange={setLanguage}
              value={queryLanguage || i18n.language || "en"}
              defaultValue="en"
            >
              <Option value="ru">{t("languages.russian")}</Option>
              <Option value="en">{t("languages.english")}</Option>
            </Select>
          </Stack>
        </Grid>
      </Grid>
    </Sheet>
  );
};

export default Footer;
