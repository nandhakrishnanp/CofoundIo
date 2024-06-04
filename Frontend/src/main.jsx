import React, { version } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store ,persistor} from "./Store/store.js";

import { PersistGate } from 'redux-persist/integration/react'


ReactDOM.createRoot(document.getElementById("root")).render(
 
    <Provider store={store}>
       <React.StrictMode>
      <BrowserRouter>
      <PersistGate persistor={persistor}>

        <App />
      </PersistGate>
      </BrowserRouter>
      </React.StrictMode>
    </Provider>
 
);
