import qs from 'qs';
import { HRM_API_URL } from "../constants/apis";
import axios from 'axios';
import request from "../services/request";


function get(params, url) {
    const concac = qs.stringify(params);
    const options = {
        method: 'GET',
        url: `/${url}?${concac}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'               
        }
    };
    return request(options);  

    

}

function get_userinfo(email, password) {
    const concac = qs.stringify({email,password});
    const url="login";
    const options = {
        method: 'POST',
        url: `/${url}`,
        headers: {
            'content-type': 'application/x-www-form-urlencoded'               
        },
        data : concac
    };
    //console.log(`/${url}?${concac}`);
    return request(options).then((response) => {
        //console.log(response);      
    }).catch(
        (error) => {
            //console.log('error');            
        }
    );
}

export { get,get_userinfo };