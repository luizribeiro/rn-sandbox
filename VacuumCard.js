/**
 * @flow
 */

import React from "react";
import gql from "graphql-tag";
import { Button, Card, Icon } from "react-native-elements";
import { View, Text } from "react-native";
import { graphql } from "react-apollo";

import ProgressBar from "./ProgressBar";
import ProgressCircle from "./ProgressCircle";
import { StatusQuery } from "./Status";

import type { ChildProps } from "react-apollo";
import type { VacuumState } from "./Status";

class VacuumCard extends React.Component {
  props: ChildProps<VacuumState, {}>;

  _onUpdateVacuum(newState: string): void {
    this.props
      .mutate({
        variables: { newState },
        update: (store, { data: { updateVacuum } }) => {
          const data = store.readQuery({ query: StatusQuery });
          data.vacuum.state = newState;
          store.writeQuery({ query: StatusQuery, data });
        },
      })
      .then(({ data }) => {
        console.log("got data", data);
      })
      .catch(error => {
        console.log("there was an error sending the query", error);
      });
  }

  render() {
    const vacuum = this.props;
    const isCleaning: boolean = vacuum.state === "CLEANING";

    return (
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
          <ProgressCircle
            value={vacuum.battery / 100.0}
            content={
              <Icon name={"battery-charging-full"} color="#376484" size={32} />
            }
          />
          <View style={{ alignItems: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 22,
                color: "#376484",
                marginBottom: isCleaning ? 2 : 0,
              }}
            >
              {vacuum.state.charAt(0).toUpperCase() +
                vacuum.state.slice(1).toLowerCase()}
            </Text>
            {isCleaning ? (
              <ProgressBar value={vacuum.cleanedArea / 70.0} />
            ) : null}
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
              onPress={() => this._onUpdateVacuum("PAUSED")}
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
              onPress={() => this._onUpdateVacuum("CLEANING")}
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
            onPress={() => this._onUpdateVacuum("CHARGING")}
          />
        </View>
      </Card>
    );
  }
}

export default graphql(gql`
  mutation UpdateVacuum($newState: VacuumState!) {
    updateVacuum(state: $newState) {
      ok
    }
  }
`)(VacuumCard);
