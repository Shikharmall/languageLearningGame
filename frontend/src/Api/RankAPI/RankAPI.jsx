import axios from "axios";
import { API_URL_BASE } from "../../utils/apiURL";

// API to update score

export const updateScoreAPI = async (data) => {
  try {
    let result = await axios(`${API_URL_BASE}/addScoreToUser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};
