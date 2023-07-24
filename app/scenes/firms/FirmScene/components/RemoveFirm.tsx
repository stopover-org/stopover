import React from "react";
import Button from "../../../../components/v2/Button";
import { useRemoveFirm } from "../useRemoveFirm";
import SubmitButton from "../../../../components/shared/SubmitButton";

const RemoveFirm = () => {
  const form = useRemoveFirm();

  return (
    <form onSubmit={form.handleSubmit()}>
      <SubmitButton
        color="danger"
        size="sm"
        variant="outlined"
        submitting={form.formState.isSubmitting}
      >
        Delete
      </SubmitButton>
    </form>
  );
};
export default React.memo(RemoveFirm);
