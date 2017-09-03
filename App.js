import ApolloClient, { createNetworkInterface } from 'apollo-client';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { StyleSheet, Text, View } from 'react-native';
import Status from './Status';

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'http://192.168.1.5:8000/graphql/',
    credentials: 'same-origin',
  }),
  shouldBatch: false,
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ApolloProvider client={client}>
          <Status />
        </ApolloProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
