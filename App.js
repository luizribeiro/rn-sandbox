import ApolloClient, { createNetworkInterface } from "apollo-client";
import React from "react";
import Status from "./Status";
import { ApolloProvider } from "react-apollo";
import { Header } from "react-native-elements";
import { ScrollView, View, Text } from "react-native";

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: "http://192.168.1.5:8000/graphql/",
    credentials: "same-origin",
  }),
  shouldBatch: false,
});

export default class App extends React.Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <Header
          statusBarProps={{ barStyle: "light-content" }}
          centerComponent={{ text: "HOME STATUS", style: { color: "#fff" } }}
          outerContainerStyles={{ backgroundColor: "#3D6DCC" }}
        />
        <ScrollView style={{ marginTop: 70, backgroundColor: "#DDD" }}>
          <ApolloProvider client={client}>
            <Status />
          </ApolloProvider>
        </ScrollView>
      </View>
    );
  }
}
