import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { user } from "./../appContext"


export async function Login(data) {
    try {
        const response = await axios.post(`${BASE_URL}/login`, data);
        return response;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}

export async function cadastrar(data) {
    try {
        const response = await axios.post(`${BASE_URL}/cadastrar`, data);
        return response;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
}