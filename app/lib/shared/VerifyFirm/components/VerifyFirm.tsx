import React from "react";
import Button from "../../../../components/v2/Button";
import { useVerifyFirm } from "../useVerifyFirm";

const VerifyFirm = () => {
  const form = useVerifyFirm();

  return (
    <form onSubmit={form.handleSubmit()}>
      <Button size="sm" type="submit" color="neutral">
        Verify
      </Button>
    </form>
  );
};

export default React.memo(VerifyFirm);
