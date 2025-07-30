import axios from "axios";
import { baseUrl } from "../environments/environment.dev";


export function userLoginAPICall(user){
    const url = baseUrl + '/Auth/Login';
    return axios.post(url, user);

}