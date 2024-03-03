import React from "react";
import { graphql, useFragment } from "react-relay";
import { FormLabel, Grid } from "@mui/joy";
import { useTranslation } from "react-i18next";
import Checkbox from "components/v2/Checkbox";
import { PaymentSettingsStep_FirmFragment$key } from "../../../../artifacts/PaymentSettingsStep_FirmFragment.graphql";
import Fieldset from "../../../v2/Fieldset";
import Input from "../../../v2/Input/Input";
import useFormContext from "../../../../lib/hooks/useFormContext";
import Typography from "../../../v2/Typography";

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
  const { t } = useTranslation();
  return (
    <Fieldset>
      <Grid xs={12}>
        <Typography level="title-lg">
          {t("forms.editEvent.priceRequirements")}
        </Typography>
      </Grid>
      <Grid lg={3} md={12} sm={12}>
        <Input
          placeholder={t("models.event.attributes.organizerPricePerUom")}
          startDecorator="RSD"
          label={t("models.event.attributes.organizerPricePerUom")}
          sx={{ maxWidth: 300 }}
          type="number"
          {...organizerPriceField}
          min={0}
          onChange={(value) => {
            if (parseInt(value, 10) >= 0) {
              organizerPriceField.onChange(parseInt(value, 10));
            } else {
              organizerPriceField.onChange(0);
            }
          }}
          value={organizerPriceField.value?.toString()}
        />
      </Grid>
      <Grid lg={3} md={12} sm={12}>
        <Input
          placeholder={t("models.event.attributes.attendeePricePerUom")}
          startDecorator="RSD"
          label={t("models.event.attributes.attendeePricePerUom")}
          sx={{ maxWidth: 300 }}
          type="number"
          value={(organizerPriceField.value * (1 + firm.margin! / 100))
            .toFixed(0)
            ?.toString()}
          hint={t("forms.editEvent.computedValue")}
          readOnly
        />
      </Grid>
      {firm.paymentTypes.includes("cash") && (
        <>
          <Grid xs={12}>
            <Checkbox
              label={t("models.event.attributes.depositAmount")}
              checked={Boolean(requiresDepositField.value)}
              onChange={() =>
                requiresDepositField.onChange(!requiresDepositField.value)
              }
              sx={{ paddingTop: "5px", paddingBottom: "5px" }}
            />
            <FormLabel>
              {t("forms.editEvent.depositExplanation")}
              <br />
              {t("forms.editEvent.depositPaymentTypeExplanation")}
            </FormLabel>
          </Grid>
          {requiresDepositField.value && (
            <Grid xs={12}>
              <Input
                placeholder={t("models.event.attributes.depositAmount")}
                startDecorator="RSD"
                label={t("models.event.attributes.depositAmount")}
                sx={{ width: 300 }}
                type="number"
                {...depositAmountField}
                value={depositAmountField.value?.toString()}
              />
            </Grid>
          )}
        </>
      )}
    </Fieldset>
  );
};

export default React.memo(PaymentSettingsStep);
