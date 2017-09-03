import React from "react";
import gql from "graphql-tag";
import { Card } from "react-native-elements";
import { View, Text } from "react-native";
import { graphql } from "react-apollo";
import { AppLoading } from "expo";

export const Status = ({ data: { loading, thermostat, vacuum } }) => {
  if (loading) {
    return <AppLoading />;
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
};

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
