import React from "react";
import SubmitButton from "components/shared/SubmitButton";
import { useVerifyFirm } from "../useVerifyFirm";

const VerifyFirm = () => {
  const form = useVerifyFirm();

  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        size="sm"
        submitting={form.formState.isSubmitting}
        color="neutral"
      >
        Verify
      </SubmitButton>
    </form>
  );
};

export default React.memo(VerifyFirm);
