import axios from "axios";
import { API_URL_BASE } from "../../utils/apiURL";

// API to update score

export const addResponseToUserAPI = async (data) => {
  try {
    let result = await axios(`${API_URL_BASE}/addResponseToUser`, {
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
