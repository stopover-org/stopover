import { AspectRatio, Box } from "@mui/joy";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

interface ImagesPreviewProps {
  images: string[];
  readonly?: boolean;
  onChange?: (images: string[]) => void;
}

const ImagesPreview = ({ images, readonly, onChange }: ImagesPreviewProps) => (
  <>
    {images.map((image, index) => (
      <AspectRatio
        variant="outlined"
        ratio="4/3"
        sx={{
          width: 300,
          bgcolor: "background.level2",
          borderRadius: "md",
          position: "relative",
          marginRight: "5px",
          marginTop: "5px",
        }}
      >
        <img alt="Logo Preview" src={image} />

        {!readonly && (
          <Box
            sx={{
              position: "absolute",
              zIndex: 2,
              right: "1rem",
              top: "1rem",
              borderRadius: "50%",
              backgroundColor: "white",
              width: "30px",
              height: "30px",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={() => {
              if (onChange instanceof Function) {
                onChange([
                  ...images.slice(0, index),
                  ...images.slice(index + 1),
                ]);
              }
            }}
          >
            <ClearIcon sx={{ color: "black" }} />
          </Box>
        )}
      </AspectRatio>
    ))}
  </>
);

export default React.memo(ImagesPreview);
