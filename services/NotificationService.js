import axios from "axios";
import { BASE_URL } from "../utils/constants";

export async function getNotifications(id, token) {
  try {
    const response = await axios.get(`${BASE_URL}/notifications/pending-requests/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error get Notificações:", error);
    throw error;
  }
}


export async function alterStatusRequestFriend(request, token) {
  try {
    console.log(request)
    const response = await axios.put(`${BASE_URL}/notifications/alter-status-friend-request`, request,  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error get Notificações:", error);
    throw error;
  }
}


export async function alterStatusRequestMatch(request, token) {
  try {
    const response = await axios.put(`${BASE_URL}/notifications/alter-status-match-request`, request, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Error get Notificações:", error);
    throw error;
  }
}