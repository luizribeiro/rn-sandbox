/**
 * @flow
 */

import * as Progress from "react-native-progress";
import React from "react";
import gql from "graphql-tag";
import { AppLoading } from "expo";
import { Button, Card } from "react-native-elements";
import { View, Text } from "react-native";
import { graphql } from "react-apollo";

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
      <Card title="Vacuum">
        <View style={{ flex: 1, flexDirection: "row", marginBottom: 20 }}>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 22 }}>
              {vacuum.state.charAt(0).toUpperCase() +
                vacuum.state.slice(1).toLowerCase()}
            </Text>
          </View>
          <View
            style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
          >
            <Text style={{ fontWeight: "bold", marginBottom: 8 }}>Battery</Text>
            <Progress.Circle
              size={80}
              showsText={true}
              progress={vacuum.battery / 100.0}
              formatText={progress => `${vacuum.battery}%`}
              thickness={5}
              color="#427AA1"
            />
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {vacuum.state === "CLEANING" ? (
            <Button
              icon={{ name: "pause" }}
              title="Pause"
              containerViewStyle={{ flex: 1, marginLeft: 0, marginRight: 0 }}
              backgroundColor="#427AA1"
            />
          ) : (
            <Button
              icon={{ name: "play-arrow" }}
              title="Clean"
              containerViewStyle={{ flex: 1, marginLeft: 0, marginRight: 0 }}
              backgroundColor="#679436"
            />
          )}
          <View style={{ width: 2 }} />
          <Button
            disabled={vacuum.state !== "PAUSED"}
            icon={{ name: "home" }}
            title="Dock"
            containerViewStyle={{ flex: 1, marginLeft: 0, marginRight: 0 }}
            backgroundColor="#427AA1"
          />
        </View>
      </Card>
      <Card title="Thermostat">
        <Text>The thermostat is {thermostat.mode}.</Text>
        <Text>Current temperature is {thermostat.currentTemperature}C.</Text>
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
