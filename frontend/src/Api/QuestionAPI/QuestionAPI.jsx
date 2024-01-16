import axios from "axios";
import { API_URL_BASE } from "../../utils/apiURL";

// API for adding questions

export const addQuestionAPI = async (data) => {
  try {
    let result = await axios(`${API_URL_BASE}/addQuestion`, {
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
