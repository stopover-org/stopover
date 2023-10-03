import { AspectRatio, Box } from "@mui/joy";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

interface ImagesPreviewProps {
  images: string[];
  readonly?: boolean;
  onChange?: (images: string[]) => void;
  width?: string | number;
}

const ImagesPreview = ({
  images,
  width = 300,
  readonly,
  onChange,
}: ImagesPreviewProps) => (
  <>
    {images.map((image, index) => (
      <AspectRatio
        key={`${image}-${index}`}
        variant="outlined"
        ratio="4/3"
        sx={{
          maxWidth: width || "250px",
          width: "100%",
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
              padding: "3px",
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
