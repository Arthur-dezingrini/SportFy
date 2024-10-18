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

export async function getMatch (matchId, token) {
    try {
        const response = await axios.get(
            `${BASE_URL}/match/get-match/${matchId}`, 
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