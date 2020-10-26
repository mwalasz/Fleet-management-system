import React from "react";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import Home from "./views/home"

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Home/>
    </Provider>
  );
}

export default App;
