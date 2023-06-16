import { Box } from "@mui/material";
import React from "react";

const LatestProduct = ({ i, product }) => {
  return (
    <Box
      key={i}
      m="4px"
      sx={{
        position: "relative",
        width: "220px",
        height: "270px",
        background: "white",
        overflow: "hiden",
        borderRadius: "20px",
        boxShadow: "0 15px 35px black",
        "&:hover>div::before": {
          bottom: "0px",
        },
        "&:hover>img": {
          transform: "translateY(-50px)",
          filter: "blur(5px)",
        },
      }}
    >
      <Box
        position="relative"
        height="100%"
        overflow="hidden"
        sx={{
          "&::before": {
            content: "''",
            position: "absolute",
            bottom: "-120px",
            width: "100%",
            height: "100%",
            background: `linear-gradient(0deg,blue,50%,transparent)`,
            transition: "0.5s",
            zIndex: "1",
          },
        }}
      >
        <Box
          src={product.images[0].image}
          alt={product.name}
          sx={{
            width: "100%",
            transition: "0.5s",
          }}
          component="img"
        />
      </Box>
    </Box>
  );
};

export default LatestProduct;
