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
