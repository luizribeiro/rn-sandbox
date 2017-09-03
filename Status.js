import React from 'react';
import gql from 'graphql-tag';
import { Card } from 'react-native-elements';
import { Text, View } from 'react-native';
import { graphql } from 'react-apollo';

function Status({ data: {loading, thermostat, vacuum} }) {
  if (loading) {
    return <Text>Loading</Text>;
  }

  return (
    <View>
      <Card title="Thermostat">
        <Text>The thermostat is {thermostat.mode}.</Text>
        <Text>Current temperature is {thermostat.currentTemperature}C.</Text>
      </Card>
      <Card title="Vacuum">
        <Text>The vacuum is {vacuum.state}.</Text>
        <Text>The vacuum's battery is at {vacuum.battery}%.</Text>
      </Card>
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
