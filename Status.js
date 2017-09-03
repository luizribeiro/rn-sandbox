import React from 'react';
import { Text, View } from 'react-native';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

function Status({ data: {loading, thermostat, vacuum} }) {
  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      <Text>The thermostat is {thermostat.mode}.</Text>
      <Text>Current temperature is {thermostat.currentTemperature}C.</Text>
      <Text>The vacuum is {vacuum.state}.</Text>
      <Text>The vacuum's battery is at {vacuum.battery}%.</Text>
    </View>
  );
}

export default graphql(gql`
  query Status {
    thermostat {
      mode
      currentTemperature
      targetTemperature
    }
    vacuum {
      state
      battery
    }
  }
`)(Status);
