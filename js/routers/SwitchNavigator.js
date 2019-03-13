import { createSwitchNavigator,createAppContainer } from "react-navigation";
import Loading from "../containers/LoadingContainer";
import Login from "../containers/LoginContainer";
import App from "./TabNavigator";
const _createSwitchNavigator = createSwitchNavigator(
  {
    Loading: Loading,       
    Login: Login,
    App: App
  },
  {
    initialRouteName: "Loading"
  }
);

export default createAppContainer(_createSwitchNavigator);
