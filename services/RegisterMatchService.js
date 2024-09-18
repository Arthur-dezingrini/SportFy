import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { user } from "./../appContext"


export async function Register (data) {
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