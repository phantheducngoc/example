import React, { Component } from 'react'
import { Text, View } from "react-native";
// import ProveMainMenuContainer from "../containers/ProveMainMenuContainer";
// import ProveChildMenuContainer from "../containers/ProveChildMenuContainer";
import { createStackNavigator } from 'react-navigation';
// const DanhBaStackNavigator = createStackNavigator(
//     {
//         MainMenuScreen:
//         {
//             screen: ProveMainMenuContainer
//         },
//         ChildMenuScreen:
//         {
//             screen: ProveChildMenuContainer
//         }
//     },
//     {
//         initialRouteName: "MainMenuScreen",
//     }
// )

export default class DanhBaStackNavigator extends Component {
  render() {
    return (
      <View>
        <Text> danh ba </Text>
      </View>
    )
  }
}
//export default DanhBaStackNavigator;