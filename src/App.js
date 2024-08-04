import React, { Component } from "react";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import HomePage from "./view/pages/HomePage.js";

const THEME = createTheme({
  palette: {
    primary: {
      main: "#888",
    },
    secondary: {
      main: "#888",
    },
    success: {
      main: "#888",
    },
    neutral: {
      main: "#888",
    },
  },
  typography: {
    fontFamily: ["sans-serif"].join(","),
    fontSize: 14,
  },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <Box sx={{ m: 1, p: 1 }}>
          <HomePage />
        </Box>
      </ThemeProvider>
    );
  }
}
