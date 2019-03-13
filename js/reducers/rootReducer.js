import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import { reducer as modalReducer } from "redux-modal";
import authReducers from "../containers/LoginContainer/redux/reducer";
import menuReducers from "../containers/MainMenuContainer/redux/reducer";
import menu2Reducers from "../containers/ChildMenuContainer/redux/reducer";
import profiles from "../containers/ProfileApprovingContainer/redux/reducer";
export default combineReducers({
  form : formReducer,
  modal : modalReducer,
  auth : authReducers,
  menu : menuReducers,
  menu2 : menu2Reducers,
  profiles : profiles
});