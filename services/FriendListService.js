// services/FriendListService.js
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export async function InviteFriend(id, token) {
  try {
    const response = await axios.get(`${BASE_URL}/invite-friend?id=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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
        `${BASE_URL}/find-players`, // Mude para usar uma única URL
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
  
