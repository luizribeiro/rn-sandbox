import ApolloClient, { createNetworkInterface } from "apollo-client";
import Expo from 'expo';
import Login from "./Login";
import React from "react";
import Status from "./Status";
import { Alert, ScrollView, View, Text } from "react-native";
import { ApolloProvider } from "react-apollo";
import { AppLoading } from "expo";
import { Header } from "react-native-elements";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      client: null,
      hasSession: null,
    };
  }

  _getApolloClient(session) {
    const networkInterface = createNetworkInterface({
      uri: "http://sb.luiz.ninja/graphql/",
    });
    networkInterface.use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {};
        }
        req.options.headers['authorization'] = `Token ${session.token}`;
        req.options.headers['content-type'] = 'application/json';
        next();
      }
    }]);
    return new ApolloClient({
      networkInterface: networkInterface,
      shouldBatch: false,
    });
  }

  async componentDidMount() {
    const session = await Expo.SecureStore.getItemAsync('session');
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
    await Expo.SecureStore.setItemAsync('session', JSON.stringify(session));
    this.setState({
      client: this._getApolloClient(session),
      hasSession: true,
    });
  }

  render() {
    if (this.state.hasSession === null) {
      return <AppLoading />;
    }

    const content = this.state.hasSession ? [
      <Header
        statusBarProps={{ barStyle: "light-content" }}
        centerComponent={{
          text: "HOME STATUS",
          style: {
            color: "#fff",
            fontWeight: "bold",
          },
        }}
        outerContainerStyles={{ backgroundColor: "#3d6dcc" }}
        key="header"
      />,
      <ScrollView style={{ marginTop: 70, backgroundColor: "#f3f3fd" }} key="content">
        <ApolloProvider client={this.state.client}>
          <Status />
        </ApolloProvider>
      </ScrollView>
    ] : (
      <Login onLogin={this._onLoginHandlerAsync} />
    );

    return (
      <View style={{ flex: 1 }}>
        {content}
      </View>
    );
  }
}
