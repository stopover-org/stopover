import { Grid } from "@mui/joy";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Step, StepLabel, Stepper } from "@mui/material";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import { useCreateEventForm } from "./useCreateEventForm";
import Breadcrumbs from "../../../../components/v2/Breadcrumbs/Breadcrumbs";
import { useSteps } from "../../../../lib/hooks/useSteps";
import EditEventForm from "../../../../components/shared/EditEventForm";
import { CreateEventScene_FirmFragment$key } from "../../../../artifacts/CreateEventScene_FirmFragment.graphql";

interface CreateEventSceneProps {
  firmFragmentRef: CreateEventScene_FirmFragment$key;
}

const CreateEventScene = ({ firmFragmentRef }: CreateEventSceneProps) => {
  const firm = useFragment<CreateEventScene_FirmFragment$key>(
    graphql`
      fragment CreateEventScene_FirmFragment on Firm {
        ...EditEventForm_FirmFragment
      }
    `,
    firmFragmentRef
  );
  const form = useCreateEventForm();
  const { t } = useTranslation();
  const { steps, currentStep, setNextStep, setPreviousStep } = useSteps([
    t("forms.editEvent.steps.eventData"),
    t("forms.editEvent.steps.dates"),
    t("forms.editEvent.steps.eventOptions"),
    t("forms.editEvent.steps.paymentSettings"),
  ]);

  return (
    <>
      <Breadcrumbs
        items={[
          { title: t("layout.header.myFirm"), href: "/my-firm" },
          t("forms.editEvent.newEvent"),
        ]}
      />
      <Grid xs={12} container>
        <Grid xs={4}>
          <Stepper activeStep={currentStep}>
            {steps.map((step, index) => {
              const stepProps: { completed?: boolean } = {
                completed: index < currentStep,
              };
              return (
                <Step key={step} {...stepProps}>
                  <StepLabel>{step}</StepLabel>
                </Step>
              );
            })}
          </Stepper>
        </Grid>
      </Grid>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit()} style={{ width: "100%" }}>
          <EditEventForm
            onNextStep={setNextStep}
            onPrevStep={setPreviousStep}
            currentStep={currentStep}
            steps={steps}
            firmFragmentRef={firm}
          />
        </form>
      </FormProvider>
    </>
  );
};

export default React.memo(CreateEventScene);
