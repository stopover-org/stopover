import { Grid, Stack } from "@mui/joy";
import React from "react";
import { graphql, useFragment } from "react-relay";
import { useTranslation } from "react-i18next";
import Fieldset from "components/v2/Fieldset/Fieldset";
import Button from "components/v2/Button/Button";
import useFormContext from "lib/hooks/useFormContext";
import { EditEventForm_FirmFragment$key } from "artifacts/EditEventForm_FirmFragment.graphql";
import GeneralStep from "./components/GeneralStep";
import DatesStep from "./components/DatesStep";
import EventOptionsStep from "./components/EventOptionsStep";
import SubmitButton from "../SubmitButton";
import PaymentSettingsStep from "./components/PaymentSettingsStep";

interface EditEventFormProps {
  steps: string[];
  currentStep: number;
  onNextStep: () => void;
  onPrevStep: () => void;
  firmFragmentRef: EditEventForm_FirmFragment$key;
}

const EditEventForm = ({
  onNextStep,
  onPrevStep,
  currentStep,
  steps,
  firmFragmentRef,
}: EditEventFormProps) => {
  const firm = useFragment(
    graphql`
      fragment EditEventForm_FirmFragment on Firm {
        ...PaymentSettingsStep_FirmFragment
      }
    `,
    firmFragmentRef
  );
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
        "title",
      ],
      ["recurringDates", "singleDates", "durationTime", "endDate"],
      ["eventOptions"],
      [
        "organizerPricePerUomCents",
        "depositAmountCents",
        "bookingCancellationOptions",
      ],
    ],
    []
  );
  const { t } = useTranslation();

  return (
    <Grid container spacing={2} md={10} sm={12}>
      {currentStep === 0 && <GeneralStep />}
      {currentStep === 1 && <DatesStep />}
      {currentStep === 2 && <EventOptionsStep />}
      {currentStep === 3 && <PaymentSettingsStep firmFragmentRef={firm} />}
      <Fieldset>
        <Grid xs={12}>
          {currentStep === steps.length - 1 ? (
            <Stack direction="row" justifyContent="space-between">
              <Button onClick={onPrevStep} variant="outlined" type="button">
                {t("general.previous")}
              </Button>
              <SubmitButton submitting={form.formState.isSubmitting}>
                {t("general.save")}
              </SubmitButton>
            </Stack>
          ) : (
            <Stack direction="row" justifyContent="space-between">
              {currentStep !== 0 && (
                <Button onClick={onPrevStep} variant="outlined" type="button">
                  {t("general.previous")}
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
                {t("general.next")}
              </SubmitButton>
            </Stack>
          )}
        </Grid>
      </Fieldset>
    </Grid>
  );
};

export default React.memo(EditEventForm);
