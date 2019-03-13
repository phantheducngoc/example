import * as ACTION_TYPES from "../redux/actionTypes";
import axios from 'axios';
import qs from 'qs';
import { HRM_API_URL } from "../../../constants/apis";
import { NavigationActions } from 'react-navigation'
import { AsyncStorage } from 'react-native';

const getMenu = (params) => async (dispatch, getState) => {
    dispatch({
        type: ACTION_TYPES.MENU_GET_REQUESTED,
    });
    const { access_token } = getState().auth;
    const data = qs.stringify({
        access_token: access_token,
        ...params,
    });
    const config = {
        method: 'GET',
        url: HRM_API_URL + '/get_menu' + '?' + data,
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
        },
    };
    //console.log(config);
    try {
        return axios(config)
            .then((response) => {
                //console.log(response.data);
                if (response.data.success == true) {    
                    //console.log("OK");                
                    dispatch({
                        type: ACTION_TYPES.MENU_GET_SUCCESS,
                        payload: response.data
                    });
                }
                else
                {
                    //console.log("ERROR");
                    dispatch({
                        type: ACTION_TYPES.USER_LOGOUT_REQUESTED                        
                    });
                    dispatch(NavigationActions.navigate({ routeName: 'Login' }));    
                }
            })
            .catch((error) => {
                //console.log(error);
                dispatch({
                    type: ACTION_TYPES.MENU_GET_FAILED,
                    error: error
                });
            });
    }
    catch (error) {
        //console.log(error);
        dispatch({
            type: ACTION_TYPES.MENU_GET_FAILED,
            error: error
        });
    }
}
export {
    getMenu
};