// services/FriendListService.js
import axios from "axios";
import { BASE_URL } from "../utils/constants";

export async function InviteFriend(id, token) {
  try {
    const response = await axios.post(`${BASE_URL}/invite-friend`, id, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error durante solicitação de amizade:", error);
    throw error;
  }
}

export async function findPlayers(id, condition = null, token) {
  try {
    axios.post(`${BASE_URL}/find-players/${id}`, condition, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
  }
}
