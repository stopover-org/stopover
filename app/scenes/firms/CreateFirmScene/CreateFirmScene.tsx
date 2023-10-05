import React from "react";
import { FormProvider } from "react-hook-form";
import { useCreateFirmForm } from "./useCreateFirmForm";
import Breadcrumbs from "../../../components/v2/Breadcrumbs";
import EditFirmForm from "../../../components/shared/EditFirmForm";
import { useTranslation } from "react-i18next";
import { GlobalSidebarContext } from "../../../components/GlobalSidebarProvider";
import { Box, Drawer, Grid } from "@mui/joy";
import Link from "../../../components/v2/Link";
import Image from "next/image";

const CreateFirmScene = () => {
  const form = useCreateFirmForm();
  const { t } = useTranslation()
  const { opened, close, open } = React.useContext(GlobalSidebarContext);

  return (
    <>
      <Breadcrumbs items={[t('forms.editFirm.createYourFirm')]} />
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit()}>
          <EditFirmForm />
        </form>
      </FormProvider>
      <Drawer open={opened} onClose={close}>
        <React.Suspense>
          <Grid xs={12}>
            <Link href="/">
              <Image
                src="https://placehold.co/250x75"
                width={300}
                height={90}
              />
            </Link>
          </Grid>
          <Grid container padding='10px'>
            <Grid xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  position: 'sticky',
                  bottom: '0',
                  gap: 1,
                  p: 1.5,
                  pb: 2,
                  width: '90%'
                }}
              >
                <Link href='/trips'>{t('layout.header.myTrips')}</Link>
              </Box>
            </Grid>
          </Grid>
        </React.Suspense>
      </Drawer>
    </>
  );
};

export default React.memo(CreateFirmScene);
