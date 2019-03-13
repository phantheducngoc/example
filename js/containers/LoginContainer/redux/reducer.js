import * as ACTION_TYPES from "../redux/actionTypes";
const initialState = {
  isAuthenticating: false,
  isFailed: false,

  access_token: null,
  success: false,
  user: {
    chucdanh: null,
    donvi: null,
    email: null,
    image: null,
    manhanvien: null,
    ngaysinh: null,
    sodienthoai: null,
    tennhanvien: null
  },
  message: null
};

export default (state = initialState, action) => {
  const { type, payload, error } = action;

  switch (type) {
    case ACTION_TYPES.USER_LOGIN_REQUESTED:
      //console.log('USER_LOGIN_REQUESTED');
      return {
        ...state,
        isAuthenticating: true,
        isFailed: false,
        access_token: null
      };
    case ACTION_TYPES.USER_LOGIN_SUCCESS:
      //console.log("2." + payload);     
      return {
        ...state,
        isAuthenticating: false,
        isFailed: false,
        access_token: payload.access_token,
        user: payload.user
      };
    case ACTION_TYPES.USER_LOGIN_FAILED:
      //console.log('USER_LOGIN_FAILED');
      return {
        ...state,
        isAuthenticating: false,
        isFailed: true,
        access_token: null,
        message: error,
      };
    case ACTION_TYPES.USER_LOGOUT_REQUESTED:
      //console.log('USER_LOGOUT_REQUESTED');
      return {
        ...initialState
      };
    case ACTION_TYPES.USER_LOGIN_INFO:
      //console.log('USER_LOGIN_DISPLAY');
      console.log(state);
      return {
        ...state,
      };
    default:
      return state;
  }
};
export const get_AccessToken = ({ access_token }) =>
  (
    {
      access_token
    }
  )