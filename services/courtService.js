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


export async function getAllCourts(token) {
  try {
    const response = await axios.get(`${BASE_URL}/court/get-all`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response
  } catch (error) {
    console.error("Erro ao pegar quadras:", error);
    throw error;
  }
}

export async function getFreeDays(token, court) {
  try {
    const response = await axios.get(`${BASE_URL}/court/get-free-days/${court}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getReservedHours (token, day) {
  try {
    const response = await axios.get(`${BASE_URL}/court/get-reserved-days/${day}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })
    console.log(response.data)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}