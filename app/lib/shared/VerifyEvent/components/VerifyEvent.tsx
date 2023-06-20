import React from "react";
import Button from "../../../../components/v2/Button/Button";
import { useVerifyEvent } from "../useVerifyEvent";

const VerifyEvent = () => {
  const form = useVerifyEvent();

  return (
    <form onSubmit={form.handleSubmit()}>
      <Button size="sm" type="submit" color="neutral">
        Verify
      </Button>
    </form>
  );
};

export default React.memo(VerifyEvent);
