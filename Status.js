/**
 * @flow
 */

import React from "react";
import gql from "graphql-tag";
import { Card } from "react-native-elements";
import { View, Text } from "react-native";
import { graphql } from "react-apollo";
import { AppLoading } from "expo";

import type { OperationComponent } from "react-apollo";

type Props = {
  data: {
    loading: boolean,
    thermostat: {
      mode: string,
      currentTemperature: number,
      targetTemperature: number,
    },
    vacuum: {
      state: string,
      battery: number,
    },
  },
};

export const Status = ({ data: { loading, thermostat, vacuum } }: Props) => {
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
