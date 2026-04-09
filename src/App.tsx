import { Suspense } from "react";
import { createTheme, ThemeProvider, CssBaseline, CircularProgress, Box } from "@mui/material";

import "./translation/i18n";

import Router from "./routes/Routes";
import { BrowserRouter } from "react-router-dom";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#FFDE02" },
    background: { default: "#0a0f1e", paper: "#111827" },
  },
  typography: {
    fontFamily: "'DM Sans', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&family=DM+Sans:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        a { color: inherit; text-decoration: none; }
      `,
    },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Suspense fallback={
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", background: "#0a0f1e" }}>
          <CircularProgress sx={{ color: "#FFDE02" }} />
        </Box>
      }>
         <BrowserRouter>
        <Router/>
        </BrowserRouter>
      </Suspense>
    </ThemeProvider>
  );
}