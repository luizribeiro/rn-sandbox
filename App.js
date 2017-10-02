/**
 * @flow
 */

import ApolloClient, { createNetworkInterface } from "apollo-client";
import Expo from "expo";
import React from "react";
import { Alert, ScrollView, View, Text } from "react-native";
import { ApolloProvider } from "react-apollo";
import { AppLoading } from "expo";
import { Header } from "react-native-elements";

import Login from "./Login";
import Status from "./Status";

import type { MiddlewareInterface, MiddlewareRequest } from "apollo-client";
import type { SessionInfo } from "./Login";

type Props = {};

type State = {
  client: ?ApolloClient,
  hasSession: ?boolean,
};

export default class App extends React.Component {
  props: Props;
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      client: null,
      hasSession: null,
    };
  }

  _getApolloClient(session: SessionInfo): ApolloClient {
    const networkInterface = createNetworkInterface({
      uri: "http://sb.luiz.ninja/graphql/",
    });
    const middleware: Array<MiddlewareInterface> = [
      {
        applyMiddleware(req: MiddlewareRequest, next: Function): void {
          if (!req.options) {
            req.options = {};
          }
          if (!req.options.headers) {
            req.options.headers = {};
          }
          req.options.headers.authorization = `Token ${session.token}`;
          req.options.headers["content-type"] = "application/json";
          next();
        },
      },
    ];
    networkInterface.use(middleware);
    return new ApolloClient({
      networkInterface: networkInterface,
      shouldBatch: false,
    });
  }

  componentDidMount() {
    this._componentDidMountAsync();
  }

  async _componentDidMountAsync() {
    const session = await Expo.SecureStore.getItemAsync("session");
    if (session) {
      const sessionObject = JSON.parse(session);
      this.setState({
        client: this._getApolloClient(sessionObject),
        hasSession: true,
      });
    } else {
      this.setState({
        client: null,
        hasSession: false,
      });
    }
  }

  _onLoginHandlerAsync = async (session: SessionInfo) => {
    await Expo.SecureStore.setItemAsync("session", JSON.stringify(session));
    this.setState({
      client: this._getApolloClient(session),
      hasSession: true,
    });
  };

  render() {
    if (this.state.hasSession === null) {
      return <AppLoading />;
    }

    let content;
    if (this.state.hasSession && this.state.client) {
      const view = (
        // $FlowFixMe
        <ApolloProvider client={this.state.client}>
          <Status />
        </ApolloProvider>
      );
      content = [
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          centerComponent={{
            text: "HOME STATUS",
            style: {
              color: "#fff",
              fontWeight: "bold",
            },
          }}
          outerContainerStyles={{ backgroundColor: "#05668D" }}
          key="header"
        />,
        <ScrollView
          style={{ marginTop: 70, backgroundColor: "#EBF2FA" }}
          key="content"
        >
          {view}
        </ScrollView>,
      ];
    } else {
      content = (
        <Login
          onLogin={(session: SessionInfo) => {
            this._onLoginHandlerAsync(session);
          }}
        />
      );
    }

    return <View style={{ flex: 1 }}>{content}</View>;
  }
}
