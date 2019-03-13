import * as ACTION_TYPES from "../redux/actionTypes";
const initialState = {
  isFetch: false,
  data: [], 
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case ACTION_TYPES.MENU2_GET_REQUESTED:
      //console.log('MENU_GET_REQUESTED');
      return {
        ...initialState,
        isFetch: true,
      };
    case ACTION_TYPES.MENU2_GET_SUCCESS:
      console.log('2MENU_GET_SUCCESS');     
      return {
        ...state,
        isFetch: false,
        data: payload,   
      };
    case ACTION_TYPES.MENU2_GET_FAILED:
      //console.log('MENU_GET_FAILED');
      return {
        ...state,
        isFetch: false,     
      };
    case ACTION_TYPES.MENU2_INFO:
      //console.log('MENU_INFO');
      console.log(state);
      return {
        ...state,
      };
    default:
      return state;
  }
};