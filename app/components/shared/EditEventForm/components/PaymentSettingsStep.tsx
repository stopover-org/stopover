import React from "react";
import { graphql, useFragment } from "react-relay";
import { FormLabel, Grid } from "@mui/joy";
import { PaymentSettingsStep_FirmFragment$key } from "../../../../artifacts/PaymentSettingsStep_FirmFragment.graphql";
import Fieldset from "../../../v2/Fieldset";
import Input from "../../../v2/Input/Input";
import useFormContext from "../../../../lib/hooks/useFormContext";
import Typography from "../../../v2/Typography";
import Checkbox from "../../../v2/Checkbox/Checkbox";
import BookingCancellationOptionsFieldset from "./BookingCancellationOptionsFieldset";

interface PaymentSettingsStepProps {
  firmFragmentRef: PaymentSettingsStep_FirmFragment$key;
}

const PaymentSettingsStep = ({ firmFragmentRef }: PaymentSettingsStepProps) => {
  const firm = useFragment<PaymentSettingsStep_FirmFragment$key>(
    graphql`
      fragment PaymentSettingsStep_FirmFragment on Firm {
        margin
        paymentTypes
      }
    `,
    firmFragmentRef
  );
  const form = useFormContext();
  const organizerPriceField = form.useFormField<number>(
    "organizerPricePerUomCents"
  );
  const depositAmountField = form.useFormField<number>("depositAmountCents");
  const requiresDepositField = form.useFormField("requiresDeposit");
  return (
    <>
      <Fieldset>
        <Grid xs={12}>
          <Typography level="h3">Price</Typography>
        </Grid>
        <Grid lg={3} md={12} sm={12}>
          <Input
            placeholder="Amount"
            startDecorator="$"
            label="You get"
            sx={{ maxWidth: 300 }}
            type="number"
            {...organizerPriceField}
            value={organizerPriceField.value.toString()}
          />
        </Grid>
        <Grid lg={3} md={12} sm={12}>
          <Input
            placeholder="Amount"
            startDecorator="$"
            label="They Pay"
            sx={{ maxWidth: 300 }}
            type="number"
            value={(organizerPriceField.value * (1 + firm.margin)).toString()}
            hint="Computed Value"
            readOnly
          />
        </Grid>

        {firm.paymentTypes.includes("cash") &&
          firm.paymentTypes.includes("cash") && (
            <>
              <Grid xs={12}>
                <Checkbox
                  label="Requires Deposit"
                  checked={Boolean(requiresDepositField.value)}
                  onChange={() =>
                    requiresDepositField.onChange(!requiresDepositField.value)
                  }
                  sx={{ paddingTop: "5px", paddingBottom: "5px" }}
                />
                <FormLabel>
                  Deposit will be used only if attendee will pay by cash
                  <br />
                  Deposit will be paid via Stripe
                </FormLabel>
              </Grid>
              {requiresDepositField.value && (
                <Grid xs={12}>
                  <Input
                    placeholder="Amount"
                    startDecorator="$"
                    label="Requied Deposit"
                    sx={{ width: 300 }}
                    type="number"
                    {...depositAmountField}
                    value={depositAmountField.value.toString()}
                  />
                </Grid>
              )}
            </>
          )}
      </Fieldset>
      <BookingCancellationOptionsFieldset />
    </>
  );
};

export default React.memo(PaymentSettingsStep);
