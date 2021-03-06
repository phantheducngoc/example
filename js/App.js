import React, { Component } from "react";
import { Provider } from "react-redux";
import configureStore from "./stores/configureStore";
import { PersistGate } from "redux-persist/integration/react";
import App from "./routers/App";
import getTheme from "../node_modules/native-base/src/theme/components";
import material from "../node_modules/native-base/src/theme/variables/material";
import { StyleProvider } from "native-base";

export default class Root extends Component {
  constructor(props) {
    super(props);
    const { persistor, store } = configureStore();
    this.persistor = persistor;
    this.store = store;
  }
  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Provider store={this.store}>
          <PersistGate persistor={this.persistor}>
            <App/>
          </PersistGate>
        </Provider>
      </StyleProvider>
    );
  }
}