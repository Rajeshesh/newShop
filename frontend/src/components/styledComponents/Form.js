import { Box } from "@mui/material";

const { default: styled } = require("@emotion/styled");

export const FormContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.alt1,
  boxShadow: `inset -2px -2px 3px  ${theme.palette.orange[200]},inset 2px 2px 3px  ${theme.palette.orange[700]}`,
  borderRadius: "5px",
  "& h1,& :last-child": {
    textAlign: "center",
    "& a": {
      fontWeight: "600",
      padding: "3px",
      backgroundColor: theme.palette.background.alt,
      borderRadius: "7px",
      textDecoration: "none",
    },
  },
  "&>div": {
    margin: "5px auto",
  },

  "& button[type=submit]": {
    width: "100%",
    margin: "10px 0",
  },
}));
