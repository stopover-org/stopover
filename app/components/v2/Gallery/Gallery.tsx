import React from "react";
import styled from "styled-components";
import { Box, Grid, Stack } from "@mui/joy";
import Typography from "components/v2/Typography";

const Img = styled.img`
  width: 100%;
`;

interface GalleryProps {
  images: Array<{ src: string; title?: string }>;
  width?: string;
  numberInRow?: number;
}

const Gallery = ({ images, width, numberInRow = 2 }: GalleryProps) => (
  <Grid width={width} sx={{ position: "relative" }}>
    <Stack flexDirection="row" justifyContent="space-between" flexWrap="wrap">
      {images.map((image, i) => (
        <Grid
          key={image.src + i}
          width={`${Math.floor(100 / numberInRow) - 0.4}%`}
        >
          <Img src={image.src} />
          <Box sx={{ textAlign: "center" }}>
            <Typography fontSize="md">{image.title}</Typography>
          </Box>
        </Grid>
      ))}
    </Stack>
  </Grid>
);

export default Gallery;
