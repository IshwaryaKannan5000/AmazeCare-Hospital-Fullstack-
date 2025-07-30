import axios from "axios";
import { baseUrl } from "../environments/environment.dev";  // Import baseUrl

export function userRegisterAPICall(user) {
    const url = `${baseUrl}/PatientAuth/register`;  // Append '/Employee' to baseUrl
    return axios.post(url, user);
}







