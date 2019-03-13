import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from "redux-persist";
import { multiClientMiddleware } from "redux-axios-middleware";
import { AsyncStorage } from "react-native";
import thunkMiddleware from "redux-thunk";
import { name as appName } from "../../app.json";
import rootReducer from "../reducers/rootReducer";

const persistConfig = {
  timeout: 10000,
  key: "root",
  blacklist: [],
  whitelist: ["auth"],
  keyPrefix: appName,
  storage: AsyncStorage
};
const middlewares = [
  thunkMiddleware,
];
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default () => {
  let store = createStore(persistedReducer, composeWithDevTools(
    applyMiddleware(...middlewares),
  ));
  let persistor = persistStore(store);
  return { store, persistor };
};
