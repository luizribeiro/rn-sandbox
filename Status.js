/**
 * @flow
 */

import * as Progress from "react-native-progress";
import React from "react";
import gql from "graphql-tag";
import { AppLoading } from "expo";
import { Button, Card, Icon } from "react-native-elements";
import { View, Text } from "react-native";
import { graphql } from "react-apollo";

import type { OperationComponent, OptionProps } from "react-apollo";

type Props = {};

type Result = {
  thermostat: {
    mode: string,
    currentTemperature: number,
    targetTemperature: number,
  },
  vacuum: {
    state: string,
    battery: number,
  },
};

export const Status = ({
  data: { loading, thermostat, vacuum },
}: OptionProps<Props, Result>) => {
  if (loading) {
    return <AppLoading />;
  }

  return (
    <View>
      <Card title="Vacuum">
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 15,
          }}
        >
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginRight: 10,
            }}
          >
            <Progress.Circle
              size={64}
              progress={vacuum.battery / 100.0}
              thickness={5}
              color="#427AA1"
            />
            <View
              style={{
                position: "absolute",
                width: 100,
                height: 100,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Icon
                name={
                  vacuum.state === "CHARGING" ? (
                    "battery-charging-full"
                  ) : (
                    "battery-full"
                  )
                }
                color="#376484"
                size={32}
              />
            </View>
          </View>
          <View>
            <Text
              style={{ fontWeight: "bold", fontSize: 22, color: "#376484" }}
            >
              {vacuum.state.charAt(0).toUpperCase() +
                vacuum.state.slice(1).toLowerCase()}
            </Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: "row" }}>
          {vacuum.state === "CLEANING" ? (
            <Button
              icon={{ name: "pause", size: 24 }}
              title="Pause"
              containerViewStyle={{ flex: 1, marginLeft: 0, marginRight: 0 }}
              backgroundColor="#427AA1"
              buttonStyle={{ padding: 8 }}
              borderRadius={5}
              textStyle={{ fontWeight: "bold" }}
            />
          ) : (
            <Button
              icon={{ name: "play-arrow", size: 24 }}
              title="Clean"
              containerViewStyle={{ flex: 1, marginLeft: 0, marginRight: 0 }}
              buttonStyle={{ padding: 8 }}
              backgroundColor="#679436"
              borderRadius={5}
              textStyle={{ fontWeight: "bold" }}
            />
          )}
          <View style={{ width: 12 }} />
          <Button
            disabled={vacuum.state !== "PAUSED"}
            icon={{ name: "home", size: 24 }}
            title="Dock"
            containerViewStyle={{ flex: 1, marginLeft: 0, marginRight: 0 }}
            backgroundColor="#427AA1"
            buttonStyle={{ padding: 8 }}
            borderRadius={5}
            textStyle={{ fontWeight: "bold" }}
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
