import { Grid } from "@mui/joy";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Step, StepLabel, Stepper } from "@mui/material";
import { graphql, useFragment } from "react-relay";
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
  const { steps, currentStep, setNextStep, setPreviousStep } = useSteps([
    "Event Data",
    "Dates",
    "Event Options",
    "Payment Settings",
  ]);

  return (
    <>
      <Breadcrumbs
        items={[{ title: "My Firm", href: "/my-firm" }, "New Event"]}
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
