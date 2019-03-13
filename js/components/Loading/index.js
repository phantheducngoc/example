import React, { Component } from "react";
import { Image, StatusBar, ActivityIndicator } from "react-native";
import { Container, Text, View } from "native-base";
import styles from "./styles";

const logo = require("../../../assets/logo-vnpt.png");

export default class Loading extends Component {
  render() {
    return (
      <Container style={styles.container}>
        <StatusBar hidden={true} />
          <Image source={logo} style={styles.logo}/>
          <Text style={styles.textLogo}>VNPT HRM Mobile</Text>
          <View style={styles.containerLoading}>
            <ActivityIndicator size="large" color="#5ABEEC" />
          </View>
      </Container>
    );
  }
}
