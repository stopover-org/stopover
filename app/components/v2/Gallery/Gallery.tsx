import React from "react";
import styled from "styled-components";
import { Box, Grid, Stack } from "@mui/joy";
import Scrollbars from "react-custom-scrollbars-2";
import Typography from "../Typography";
import Button from "../Button";

const Img = styled.img`
  width: 100%;
`;

interface GalleryProps {
  opened?: boolean;
  onOpen: () => void;
  onClose: () => void;
  images: Array<{ src: string; title?: string }>;
  minHeight?: string;
  maxHeight?: string;
  width?: string;
  numberInRow?: number;
}

const Gallery = ({
  opened = false,
  onOpen,
  onClose,
  images,
  minHeight = "600px",
  maxHeight = "none",
  width,
  numberInRow = 2,
}: GalleryProps) => {
  const clickHandler = React.useCallback(() => {
    if (opened) {
      onClose();
    } else {
      onOpen();
    }
  }, [opened, onClose, onOpen]);

  const height = React.useMemo(
    () => (opened ? maxHeight : minHeight),
    [opened, maxHeight, minHeight]
  );

  return (
    <Scrollbars style={{ width, height }}>
      <Grid width={width} height={height} sx={{ position: "relative" }}>
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          flexWrap="wrap"
        >
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
        <Box
          sx={{
            position: "sticky",
            bottom: "5px",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button
            onClick={clickHandler}
            sx={{
              backgroundColor: "#000",
              color: "#fff",
              opacity: 0.8,
              textAlign: "center",
              "&:hover": {
                backgroundColor: "#000",
                opacity: 0.8,
              },
            }}
          >
            <Typography sx={{ color: "#fff" }} fontSize="16px">
              {!opened ? "I want to see more" : "roll up"}
            </Typography>
          </Button>
        </Box>
      </Grid>
    </Scrollbars>
  );
};

export default Gallery;
