import axios from "axios";
import { BASE_URL } from "../utils/constants";

export async function addCourt(token, objeto) {
  try {
    const response = await axios.post(`${BASE_URL}/court/add`, objeto, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error("Erro ao cadastrar quadra:", error);
    throw error;
  }
}