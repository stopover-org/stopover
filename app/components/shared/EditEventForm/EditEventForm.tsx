import { Grid, Stack } from "@mui/joy";
import React from "react";
import Fieldset from "../../v2/Fieldset/Fieldset";
import Button from "../../v2/Button/Button";
import useFormContext from "../../../lib/hooks/useFormContext";
import GeneralStep from "./components/GeneralStep";
import DatesStep from "./components/DatesStep";
import EventOptionsStep from "./components/EventOptionsStep";
import SubmitButton from "../SubmitButton";

interface EditEventFormProps {
  steps: string[];
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
}

const EditEventForm = ({
  onNextStep,
  onPrevStep,
  currentStep,
  steps,
}: EditEventFormProps) => {
  const form = useFormContext();
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
      ["recurringDates", "singleDates", "durationTime", "endDate"],
      ["eventOptions"],
    ],
    []
  );

  return (
    <Grid container spacing={2} md={10} sm={12}>
      {currentStep === 0 && <GeneralStep />}
      {currentStep === 1 && <DatesStep />}
      {currentStep === 2 && <EventOptionsStep />}
      <Fieldset>
        <Grid xs={12}>
          {currentStep === steps.length - 1 ? (
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={onPrevStep} variant="outlined" type="button">
                Previous
              </Button>
              <SubmitButton submitting={form.formState.isSubmitting}>
                Submit
              </SubmitButton>
            </Stack>
          ) : (
            <Stack direction="row" justifyContent="space-between">
              {currentStep !== 0 && (
                <Button onClick={onPrevStep} variant="outlined" type="button">
                  Previous
                </Button>
              )}
              <SubmitButton
                onClick={(event) => {
                  event.preventDefault();

                  form
                    .trigger(stepFields[currentStep] as Array<any>)
                    .then((res) => {
                      if (res) {
                        onNextStep();
                      }
                    });
                }}
                submitting={false}
              >
                Next
              </SubmitButton>
            </Stack>
          )}
        </Grid>
      </Fieldset>
    </Grid>
  );
};

export default React.memo(EditEventForm);
