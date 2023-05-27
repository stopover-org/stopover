import React from "react";
import Button from "../../../../components/v2/Button";
import { useRemoveFirm } from "../useRemoveFirm";

const RemoveFirm = () => {
  const form = useRemoveFirm();

  return (
    <form onSubmit={form.handleSubmit()}>
      <Button color="danger" size="sm" variant="outlined" type="submit">
        Delete
      </Button>
    </form>
  );
};
export default React.memo(RemoveFirm);
