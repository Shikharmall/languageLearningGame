import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";
import { addQuestionAPI } from "../Api/QuestionAPI/QuestionAPI";

const QuestionForm = () => {
  const [rolenumber, setRolenumber] = useState([{ role: "" }]);

  const [obj, setObj] = useState([
    {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      level: "easy",
      language: "english",
    },
  ]);

  const addrole = () => {
    setRolenumber([...rolenumber, { role: "" }]);
    setObj([
      ...obj,
      {
        question: "",
        option1: "",
        option2: "",
        option3: "",
        option4: "",
        level: "easy",
        language: "english",
      },
    ]);
  };

  const removerole = (indexxx) => {
    const rows = [...rolenumber];
    rows.splice(indexxx, 1);
    setRolenumber(rows);

    const updatedItems = obj.filter((_, index) => index !== indexxx);
    setObj(updatedItems);
  };

  const [formData, setFormData] = useState({
    questions: "",
  });

  const onChangeHandler = (e, index) => {
    const { name, value } = e.target;
    const newData = [...obj];
    newData[index][name] = value;
    setObj(newData);
    setFormData({ questions: obj });
  };

  function submitHandler(e) {
    e.preventDefault();
    console.log(formData);
    addQuestionAPI(formData).then((res) => {
      if (res.status === 201) {
        setRolenumber([{ role: "" }]);

        setObj([
          {
            question: "",
            option1: "",
            option2: "",
            option3: "",
            option4: "",
            level: "easy",
            language: "english",
          },
        ]);

        setFormData({
          questions: "",
        });
        toast("Questions Added!");
      } else {
        toast(res.response.data.message);
      }
    });
  }

  return (
    <>
    <ToastContainer></ToastContainer>
      <div className="relative overflow-x-auto  sm:rounded-lg p-3" id="movetop">
        <div className="flex items-center justify-center">
          <div className="relative w-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                  Add Question
                </h3>
              </div>

              <div className="p-6 space-y-6">
                <div className="grid grid-cols-6 gap-6">
                  {rolenumber.map((_, index) => (
                    <React.Fragment key={index}>
                      <div className="col-span-6 sm:col-span-6">
                        {" "}
                        <label
                          htmlFor="question"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          <span>Question {index + 1}: </span>

                          {index === 0 ? null : (
                            <button
                              type="button"
                              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white float-right"
                              data-modal-hide="editUserModal"
                              onClick={() => removerole(index)}
                            >
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 2"
                              >
                                <rect
                                  width="14"
                                  height="2"
                                  x="0"
                                  y="1"
                                  fill="currentColor"
                                />
                              </svg>
                            </button>
                          )}
                        </label>
                        <textarea
                          type="text"
                          name="question"
                          id="question"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Question"
                          required
                          onChange={(e) => onChangeHandler(e, index)}
                          value={obj[index].question}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <input
                          type="text"
                          name="option1"
                          id="option1"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Option 1(Enter here the correct option)"
                          required
                          onChange={(e) => onChangeHandler(e, index)}
                          value={obj[index].option1}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <input
                          type="text"
                          name="option2"
                          id="option2"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Option 2"
                          required
                          onChange={(e) => onChangeHandler(e, index)}
                          value={obj[index].option2}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <input
                          type="text"
                          name="option3"
                          id="option3"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Option 3"
                          required
                          onChange={(e) => onChangeHandler(e, index)}
                          value={obj[index].option3}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <input
                          type="text"
                          name="option4"
                          id="option4"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          placeholder="Enter Option 4"
                          required
                          onChange={(e) => onChangeHandler(e, index)}
                          value={obj[index].option4}
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <select
                          type="text"
                          name="level"
                          id="level"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          onChange={(e) => onChangeHandler(e, index)}
                          value={obj[index].level}
                        >
                          <option value="" disabled>
                            Select Level
                          </option>
                          <option value="easy">Easy</option>
                          <option value="moderate">Moderate</option>
                          <option value="hard">Hard</option>
                        </select>
                      </div>
                      <div className="col-span-6 sm:col-span-3">
                        <select
                          type="text"
                          name="language"
                          id="language"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                          required
                          onChange={(e) => onChangeHandler(e, index)}
                          value={obj[index].language}
                        >
                          <option value="" disabled>
                            Select Language
                          </option>
                          <option value="english">English</option>
                          <option value="hindi">Hindi</option>
                          <option value="french">French</option>
                        </select>
                      </div>
                    </React.Fragment>
                  ))}
                  <div className="col-span-6 sm:col-span-6">
                    <button
                      type="button"
                      className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      data-modal-hide="editUserModal"
                      onClick={addrole}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M1 7h12M7 1v12"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={submitHandler}
                >
                  Add Questions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuestionForm;
