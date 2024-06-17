import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProvider from "./utils/ThemeContext";
import App from "./App";
import { Provider } from "react-redux";
import { CookiesProvider } from "react-cookie";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/combineReducers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <CookiesProvider>
        <Router>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </Router>
      </CookiesProvider>
    </PersistGate>
  </Provider>
);
