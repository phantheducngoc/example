import axios from 'axios';
import { HRM_API_URL } from "../constants/apis";

const client = axios.create({
    baseURL: HRM_API_URL,     
});
const request = function (options) {  
    return client(options);        
}
export default request;
