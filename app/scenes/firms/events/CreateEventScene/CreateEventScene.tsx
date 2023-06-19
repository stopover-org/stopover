import { Grid, Stack } from "@mui/joy";
import React from "react";
import { FormProvider } from "react-hook-form";
import { Step, StepLabel, Stepper } from "@mui/material";
import { CreateEventFields, useCreateEventForm } from "./useCreateEventForm";
import Breadcrumbs from "../../../../components/v2/Breadcrumbs/Breadcrumbs";
import Fieldset from "../../../../components/v2/Fieldset";
import Button from "../../../../components/v2/Button";
import { useSteps } from "../../../../lib/hooks/useSteps";
import GeneralStep from "./components/GeneralStep";
import DatesStep from "./components/DatesStep";
import EventOptionsStep from "./components/EventOptionsStep";

const CreateEventScene = () => {
  const form = useCreateEventForm();
  const { steps, currentStep, setNextStep, setPreviousStep } = useSteps([
    "Event Data",
    "Dates",
    "Event Options",
  ]);

  const stepFields = React.useMemo(
    () => [
      [
        "images",
        "requiresCheckIn",
        "requiresContract",
        "requiresPassport",
        "eventType",
        "description",
        "maxAttendees",
        "minAttendees",
        "organizerPricePerUomCents",
        "title",
        "fullAddress",
      ],
      ["recurringDates", "singleDates", "durationTime"],
      ["eventOptions"],
    ],
    []
  );

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
          <Grid container spacing={2} md={10} sm={12}>
            {currentStep === 0 && <GeneralStep />}
            {currentStep === 1 && <DatesStep />}
            {currentStep === 2 && <EventOptionsStep />}
            <Fieldset>
              <Grid xs={12}>
                {currentStep === steps.length - 1 ? (
                  <Stack direction="row" justifyContent="space-between">
                    <Button
                      onClick={setPreviousStep}
                      variant="outlined"
                      type="button"
                    >
                      Previous
                    </Button>
                    <Button type="submit">Submit</Button>
                  </Stack>
                ) : (
                  <Stack direction="row" justifyContent="space-between">
                    {currentStep !== 0 && (
                      <Button
                        onClick={setPreviousStep}
                        variant="outlined"
                        type="button"
                      >
                        Previous
                      </Button>
                    )}
                    <Button
                      onClick={(event) => {
                        event.preventDefault();

                        form
                          .trigger(
                            stepFields[currentStep] as Array<
                              keyof CreateEventFields
                            >
                          )
                          .then((res) => {
                            if (res) {
                              setNextStep();
                            }
                          });
                      }}
                      type="button"
                    >
                      Next
                    </Button>
                  </Stack>
                )}
              </Grid>
            </Fieldset>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default React.memo(CreateEventScene);
