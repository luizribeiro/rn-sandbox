/**
 * @flow
 */

import React from "react";
import gql from "graphql-tag";
import { AppLoading } from "expo";
import { Card } from "react-native-elements";
import { View, Text } from "react-native";
import { graphql } from "react-apollo";

import VacuumCard from "./VacuumCard";

import type { OptionProps } from "react-apollo";

type Props = {};

export type ThermostatState = {
  mode: string,
  currentTemperature: number,
  targetTemperature: number,
};

export type VacuumState = {
  state: string,
  battery: number,
  cleanedArea: number,
};

type Result = {
  thermostat: ThermostatState,
  vacuum: VacuumState,
};

export const StatusQuery = gql`
  query Status {
    thermostat {
      mode
      currentTemperature
      targetTemperature
    }
    vacuum {
      state
      battery
      cleanedArea
    }
  }
`;

export const Status = (props: OptionProps<Props, Result>) => {
  const { loading, thermostat, vacuum } = props.data;
  if (loading) {
    return <AppLoading />;
  }

  return (
    <View>
      <VacuumCard {...vacuum} />
      <Card title="Thermostat">
        <Text>The thermostat is {thermostat.mode}.</Text>
        <Text>Current temperature is {thermostat.currentTemperature}C.</Text>
      </Card>
    </View>
  );
};

export default graphql(StatusQuery, {
  options: props => {
    return { pollInterval: 30000 };
  },
})(Status);
