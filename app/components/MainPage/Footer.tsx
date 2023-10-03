import { Grid, Option, Sheet } from "@mui/joy";
import React from "react";
import { useTranslation } from "react-i18next";
import { useCookies } from "react-cookie";
import { Environment, RecordSource, Store } from "relay-runtime";
import { getRelaySerializedState } from "relay-nextjs";
import Select from "../v2/Select";
import {
  createClientNetworkWs,
  createWsHandler,
} from "../../lib/clientEnvironment";

const Footer = () => {
  const { t, i18n } = useTranslation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [cookies, setCookie] = useCookies(["i18next"]);
  const setLanguage = React.useCallback(
    (language: string) => {
      i18n.changeLanguage(language);

      setCookie("i18next", language);

      const w = window as any;

      w.relayEnvironment = new Environment({
        network: createClientNetworkWs(createWsHandler()),
        store: new Store(new RecordSource(getRelaySerializedState()?.records), {
          gcReleaseBufferSize: 50, // Unneeded query cache to keep in memory
          queryCacheExpirationTime: 24 * 60 * 60 * 1000, // Expiration time in milliseconds for query cache
        }),
        isServer: false,
      });

      w.location.reload();
    },
    [setCookie, i18n]
  );
  return (
    <Sheet sx={{ minHeight: "100px" }}>
      <Grid container>
        <Grid xs={4} padding={4} />
        <Grid xs={4} padding={4} />
        <Grid xs={4} padding={4}>
          <Select
            placeholder={t("languages.action")}
            name={i18n.language}
            sx={{ width: 200 }}
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
