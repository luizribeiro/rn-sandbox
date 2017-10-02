/**
 * @flow
 */

import Expo from "expo";
import React from "react";
import { Card } from "react-native-elements";
import { Icon, SocialIcon } from "react-native-elements";
import { StyleSheet, View, Text } from "react-native";

import { FACEBOOK_APP_ID } from "./Config";

export type SessionInfo = {
  token: string,
};

type Props = {
  onLogin: SessionInfo => void,
};

export default class Login extends React.Component {
  props: Props;

  _handleLoginWithFacebookAsync = async () => {
    const {
      type,
      token,
    } = await Expo.Facebook.logInWithReadPermissionsAsync(FACEBOOK_APP_ID, {
      permissions: ["email", "public_profile"],
    });
    if (type !== "success") {
      return;
    }

    let response = await fetch("http://sb.luiz.ninja/api/auth/facebook/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        access_token: token,
      }),
    });
    let responseJSON = await response.json();

    this.props.onLogin({
      token: responseJSON.key,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <Icon name="home" size={192} color="#888" />
        <SocialIcon
          button
          onPress={this._handleLoginWithFacebookAsync}
          style={styles.loginButton}
          title="Log in with Facebook"
          type="facebook"
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#f3f3fd",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  loginButton: {
    paddingHorizontal: 20,
  },
});
