import React, { Component } from "react";

import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import HomePage from "./view/pages/HomePage.js";

const MAX_WIDTH = Math.min(800, window.innerWidth * 0.8);

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
    fontFamily: ["Antic", "sans-serif"].join(","),
    fontSize: 14,
  },
});

export default class App extends Component {
  render() {
    return (
      <ThemeProvider theme={THEME}>
        <Box sx={{ maxWidth: MAX_WIDTH, margin: "auto", marginTop: 4 }}>
          <HomePage />
        </Box>
      </ThemeProvider>
    );
  }
}
