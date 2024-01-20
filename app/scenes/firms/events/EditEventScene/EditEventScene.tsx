import { Grid } from "@mui/joy";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Step, StepLabel, Stepper } from "@mui/material";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import Breadcrumbs from "components/v2/Breadcrumbs/Breadcrumbs";
import { useSteps } from "lib/hooks/useSteps";
import EditEventForm from "components/shared/EditEventForm";
import { EditEventScene_EventFragment$key } from "artifacts/EditEventScene_EventFragment.graphql";
import { useUpdateEventForm } from "./useUpdateEventForm";

interface EditEventSceneProps {
  eventFragmentRef: EditEventScene_EventFragment$key;
}

const CreateEventScene = ({ eventFragmentRef }: EditEventSceneProps) => {
  const event = useFragment<EditEventScene_EventFragment$key>(
    graphql`
      fragment EditEventScene_EventFragment on Event {
        title
        id
        firm {
          ...EditEventForm_FirmFragment
        }
        ...useUpdateEventForm_EventFragment
      }
    `,
    eventFragmentRef
  );
  const form = useUpdateEventForm(event);
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
          { title: event.title, href: `/my-firm/events/${event.id}}` },
          t("general.edit"),
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
            firmFragmentRef={event.firm}
          />
        </form>
      </FormProvider>
    </>
  );
};

export default React.memo(CreateEventScene);
