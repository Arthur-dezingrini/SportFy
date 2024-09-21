import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useAuth } from "./../appContext"


export async function Register (data) {
    const { token } = useAuth() 
    try {
        const response = await axios.post(
            `${BASE_URL}/register-Match`, 
            data, 
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