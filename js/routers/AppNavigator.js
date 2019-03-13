import { createStackNavigator } from "react-navigation";
import TabNavigator from "./TabNavigator";

export default createStackNavigator(
  {
    TabNavigator: { screen: TabNavigator },
  },
  {
    initialRouteName: "TabNavigator",
    headerMode: "none"
  }
);