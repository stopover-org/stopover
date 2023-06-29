import { Grid, Stack } from "@mui/joy";
import React from "react";
import useFormContext from "../../../lib/hooks/useFormContext";
import ImagesPreview from "../ImagesPreview";

const ImagesPreviewFields = () => {
  const form = useFormContext();
  const imagesField = form.useFormField<string[]>("images");
  return (
    <Grid xs={12}>
      <Stack flexDirection="row" flexWrap="wrap">
        <ImagesPreview
          images={imagesField.value}
          onChange={imagesField.onChange}
          readonly={false}
        />
      </Stack>
    </Grid>
  );
};

export default React.memo(ImagesPreviewFields);
