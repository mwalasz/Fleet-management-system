import React from "react";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import HomeView from "./views/homeView";

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <HomeView />
    </Provider>
  );
}

export default App;
