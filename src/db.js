import { AXIOS_BASE_URL } from '@/main.js'
import axios from 'axios';


export async function registerUser(username, email, password) {
    const q = AXIOS_BASE_URL +  "add_user?" + 
                                "username=" + username + 
                                "&email=" + email + 
                                "&password=" + password

    const res = await axios.get(q)

    if (res.data == "OK") {
        return "OK";
    } else if (res.data == "[ERROR]-UsernameTaken") {
        return "[ERROR]-UsernameTaken"
    }
    return "ERROR";
}