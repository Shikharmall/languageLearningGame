import axios from "axios";
import { API_URL_BASE } from "../../utils/apiURL";

// API to add response

export const addResponseToUserAPI = async (data) => {
  console.log(data);
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

// API to get overall response

export const getUserResponseAPI = async (user_id) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getUserResponse?user_id=${user_id}`,
      {
        method: "GET",
        headers: {
          //"Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// API to get english language stat

export const getUserResponseEnglishAPI = async (user_id) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getUserResponse?user_id=${user_id}`,
      {
        method: "GET",
        headers: {
          //"Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// API to get hindi language stat

export const getUserResponseHindiAPI = async (user_id) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getUserResponseHindi?user_id=${user_id}`,
      {
        method: "GET",
        headers: {
          //"Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// API to get french language stat

export const getUserResponseFrenchAPI = async (user_id) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getUserResponseFrench?user_id=${user_id}`,
      {
        method: "GET",
        headers: {
          //"Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// API to reset progress

export const resetProgressAPI = async (user_id) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/resetProgress?user_id=${user_id}`,
      {
        method: "PATCH",
        headers: {
          //"Content-Type": "application/json",
        },
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};
