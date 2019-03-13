import * as ACTION_TYPES from "../redux/actionTypes";
const initialState = {
  isFetching: false,
  data: [], 
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case ACTION_TYPES.PROFILES_GET_REQUESTED:
      //console.log('MENU_GET_REQUESTED');
      return {
        ...initialState,
        isFetching: true,
      };
    case ACTION_TYPES.PROFILES_GET_SUCCESS:
      console.log('PROFILES_GET_SUCCESS');     
      return {
        ...state,
        isFetching: false,
        data: payload,   
      };
    case ACTION_TYPES.PROFILES_GET_FAILED:
      //console.log('MENU_GET_FAILED');
      return {
        ...state,
        isFetching: false,     
      };
    case ACTION_TYPES.PROFILES_INFO:
      //console.log('MENU_INFO');
      console.log(state);
      return {
        ...state,
      };
    default:
      return state;
  }
};