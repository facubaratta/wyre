import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Box from "@mui/material/Box";
import GridBackground from "./gridBackground/GridBackground";
import LandingPage from "./landing/LandingPage";
import { PreferencesProvider } from "./preferences/PreferencesProvider";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#181a19", paper: "#181a19" },
    text: { primary: "#ebe8de", secondary: "#a4a69d" },
    primary: { main: "#c2a27b" },
  },
  typography: { fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  components: {
    MuiCssBaseline: { styleOverrides: {
      "::selection": { background: "var(--accent)", color: "#181a19" },
      body: { overscrollBehavior: "none" },
    } },
  },
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PreferencesProvider>
        <Box sx={{ minHeight: "100svh", background: "#181a19" }}>
          <GridBackground />
          <LandingPage />
        </Box>
      </PreferencesProvider>
    </ThemeProvider>
  );
}
