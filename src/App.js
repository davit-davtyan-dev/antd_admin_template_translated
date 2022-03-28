import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import store from "./store";
import Router from "./router";
import './i18n';

class App extends Component {
  render() {
    return (
      <ConfigProvider>
        <Provider store={store}>
          <Router />
        </Provider>
      </ConfigProvider>
    );
  }
}

export default App;
