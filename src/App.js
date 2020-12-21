import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./assets/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import TaTeTi from "./components/TaTeTi";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <TaTeTi />
    </ThemeProvider>
  );
};

export default App;
