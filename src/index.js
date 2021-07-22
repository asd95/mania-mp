// React
import React from "react";
import ReactDOM from "react-dom";

// Redux
import { Provider } from "react-redux";

// Rounting
import { BrowserRouter as Router } from "react-router-dom";

// Service
import { ServiceProvider } from "./service";
import Service from "./service";
import store from "./store";

// Components
import App from "./components/App";

const service = new Service();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ServiceProvider value={service}>
        <Router>
          <App />
        </Router>
      </ServiceProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
