import axios from "axios";
import { API_URL_BASE } from "../../utils/apiURL";

// API for adding questions

export const addQuestionAPI = async (data) => {
 // let user_id = localStorage.getItem("user_id");
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

// API for getting question

export const getQuestionAPI = async (language,score) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getQuestion?language=${language}&score=${score}`,
      {
        method: "GET",
        withCredentials: true,
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// API for getting all questions

export const getAllQuestionsAPI = async (language, level) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getAllQuestions?language=${language}&level=${level}`,
      {
        method: "GET",
        withCredentials: true,
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// API for getting question by ID

export const getQuestionByIDAPI = async (question_id) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/getQuestionByID?question_id=${question_id}`,
      {
        method: "GET",
        withCredentials: true,
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};

// API for updating question

export const updateQuestionAPI = async (question_id, data) => {
  try {
    let result = await axios(
      `${API_URL_BASE}/updateQuestion?question_id=${question_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      }
    );
    return result;
  } catch (error) {
    return error;
  }
};
