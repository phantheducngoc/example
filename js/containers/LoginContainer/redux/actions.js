import * as ACTION_TYPES from "../redux/actionTypes";
import axios from 'axios';
import qs from 'qs';
import { HRM_AUTH_URL } from "../../../constants/apis";
import { AsyncStorage } from 'react-native';

export function userRequestLogout() {
  return {
    type: ACTION_TYPES.USER_LOGOUT_REQUESTED,
    payload: {},
  };
}

export function userInfo() {
  return {
    type: ACTION_TYPES.USER_LOGIN_INFO,
  };
}

const userLogin = ({ email, password }) => async dispatch => {
  const data = qs.stringify({
    email: email,
    password: password,
  });

  const config = {
    method: 'POST',
    url: HRM_AUTH_URL,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
    },
    data: data
  };
  //console.log(config);
  try {
    return axios(config)
      .then((response) => {
        //console.log(response.data);
        if (response.data.success == true) {
          //const { code } = response.data;
          //console.log('USER_LOGIN_SUCCESS');
          console.log(response.data);
          //await AsyncStorage.setItem('access_token', response.data.access_token);
          dispatch({
            type: ACTION_TYPES.USER_LOGIN_SUCCESS,
            payload: response.data
          });
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: ACTION_TYPES.USER_LOGIN_FAILED,
          error: error
        });
      });
  }
  catch (error) {
    console.log(error);
    dispatch({
      type: ACTION_TYPES.USER_LOGIN_FAILED,
      error: error
    });
  }
}
export {
  userLogin
};
