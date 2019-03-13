import * as ACTION_TYPES from "../redux/actionTypes";
import axios from 'axios';
import qs from 'qs';
import { HRM_API_URL } from "../../../constants/apis";

const getMenu2 = (params) => async (dispatch, getState) => {
    dispatch({
        type: ACTION_TYPES.MENU2_GET_REQUESTED,
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
                console.log(response.data);
                if (response.data.success == true) {
                    dispatch({
                        type: ACTION_TYPES.MENU2_GET_SUCCESS,
                        payload: response.data
                    });
                }
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: ACTION_TYPES.MENU2_GET_FAILED,
                    error: error
                });
            });
    }
    catch (error) {
        console.log(error);
        dispatch({
            type: ACTION_TYPES.MENU2_GET_FAILED,
            error: error
        });
    }
}
export {
    getMenu2
};