import React from "react";
import Button from "../../../../components/v2/Button";
import { useVerifyFirm } from "../useVerifyFirm";

const VerifyFirm = () => {
  const form = useVerifyFirm();

  return (
    <form onSubmit={form.handleSubmit()}>
      <Button size="sm" variant="outlined" type="submit">
        Verify
      </Button>
    </form>
  );
};

export default React.memo(VerifyFirm);
