import axios from "axios";
import { BASE_URL } from "../utils/constants";


export async function Register (data, token) {
    try {
        const response = await axios.post(
            `${BASE_URL}/match/add`, 
            data, 
            {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
            }
        )
        return response
    } catch (error) {

    }

}

export async function getFriends (data) {
    try {
        const response = await axios.get(
            `${BASE_URL}/get-friends`, 
            {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
            }
        )
    } catch (error) {

    }

}