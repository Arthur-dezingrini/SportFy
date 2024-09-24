import axios from "axios";
import { BASE_URL } from "../utils/constants";

export async function InviteFriend(data, token) {
  try {
    const response = await axios.post(`${BASE_URL}/friends-request/send`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error("Error durante solicitação de amizade:", error);
    throw error;
  }
}

export async function findPlayers(id, condition = '', token) {
    try {
      const response = await axios.get(
        `${BASE_URL}/find-players`,
        {
          params: {
            id,
            condition,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response;
    } catch (error) {
      console.error(error);
    }
  }
  
  export async function updateinviteFriend(data, token) {
    try {
      const response = await axios.put(`${BASE_URL}/friends-request/update`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response;
    } catch (error) {
      console.error("Error durante solicitação de amizade:", error);
      throw error;
    }
  }

  export async function getFriendRequest(id) {
    try {
      const response = await axios.get(`${BASE_URL}/friend-request?id=${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return response
    } catch(error) {
      console.error(error)
    }
  }