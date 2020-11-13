import React from "react";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import { ThemeProvider } from "styled-components";
import HomeView from "./views/homeView";
import { theme } from "./utils/theme";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <HomeView />
      </ThemeProvider>
    </Provider>
  );
}

export default App;
