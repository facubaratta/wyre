import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Box from "@mui/material/Box";
import GridBackground from "./gridBackground/GridBackground";
import Hero from "./hero/Hero";

const theme = createTheme({
  palette: {
    mode: "dark",
    background: { default: "#07102b", paper: "#07102b" },
    text: { primary: "#f2f2ee" },
  },
  typography: { fontFamily: "Arial, Helvetica, sans-serif" },
});

const Page = () => (
  <Box sx={{ minHeight: "100svh", background: "#07102b" }}>
    <GridBackground />
    <Hero />
  </Box>
);

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Page />
    </ThemeProvider>
  );
}
