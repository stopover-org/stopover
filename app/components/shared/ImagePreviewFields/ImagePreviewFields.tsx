import { Grid, Stack } from "@mui/joy";
import React from "react";
import useFormContext from "../../../lib/hooks/useFormContext";
import ImagesPreview from "../ImagesPreview";

const ImagePreviewFields = () => {
  const form = useFormContext();
  const imageField = form.useFormField<string>("image");
  return (
    <Grid xs={12}>
      <Stack flexDirection="row" flexWrap="wrap">
        <ImagesPreview
          images={imageField.value ? [imageField.value] : []}
          onChange={(images) => imageField.onChange(images[0])}
          readonly={false}
        />
      </Stack>
    </Grid>
  );
};

export default React.memo(ImagePreviewFields);
