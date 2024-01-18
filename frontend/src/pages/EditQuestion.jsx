import React, { useEffect, useState } from "react";
import img1 from "../images/user.png";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { NavLink, useParams, Link } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Navigation from "../partials/Navigation";
import {
  getQuestionByIDAPI,
  updateQuestionAPI,
} from "../Api/QuestionAPI/QuestionAPI";

const EditQuestion = () => {
  const [loader, setLoader] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { question_id } = useParams();

  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    level: "",
    language: "",
  });

  const onChangeHandler = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    //setLoad(true);
    e.preventDefault();
    //console.log(formData);
    updateQuestionAPI(question_id, formData).then((res) => {
      console.log(res);
      if (res.status === 200) {
        //setLoad(false);

        setFormData({
          question: "",
          option1: "",
          option2: "",
          option3: "",
          option4: "",
          level: "",
          language: "",
        });

        toast("Question Updated!");
        getAllQuestionsFunc(question_id);
      } else {
        toast(res.response.data.message);
      }
    });
  };
  const getAllQuestionsFunc = (question_id) => {
    setLoader(true);
    getQuestionByIDAPI(question_id).then((res) => {
      if (res.status === 200) {
        setLoader(false);
        console.log(res?.data?.data?.question);
        setFormData((prevFormData) => ({
          ...prevFormData,
          question: res?.data?.data?.question,
          option1: res?.data?.data?.option1,
          option2: res?.data?.data?.option2,
          option3: res?.data?.data?.option3,
          option4: res?.data?.data?.option4,
          level: res?.data?.data?.level,
          language: res?.data?.data?.language,
        }));
      } else {
        console.log("Data Fetching Failed!");
      }
    });
  };

  useEffect(() => {
    getAllQuestionsFunc(question_id);
  }, [question_id]);

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <Navigation />

          <div
            className="relative sm:rounded-lg p-3 w-full h-full"
            id="movetop"
          >
            {loader ? (
              <div className="flex justify-center items-center w-full h-full overflow-hidden">
                <Audio
                  height="80"
                  width="80"
                  radius="9"
                  color="blue"
                  ariaLabel="loading"
                  wrapperStyle
                  wrapperClass
                />
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-2xl max-h-full ">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                        Edit Question
                      </h3>
                      <Link to={`/admin/allquestions`}>
                        <button
                          type="button"
                          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                          data-modal-hide="editUserModal"
                          onClick={() => {
                            //setAction(true);
                          }}
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
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </Link>
                    </div>
                    <div className="p-6 space-y-6">
                      <div className="grid grid-cols-6 gap-6">
                        <div className="col-span-6 sm:col-span-6">
                          {" "}
                          <textarea
                            type="text"
                            name="question"
                            id="question"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Question"
                            required
                            onChange={(e) => onChangeHandler(e)}
                            value={formData?.question}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <input
                            type="text"
                            name="option1"
                            id="option1"
                            className="shadow-sm bg-green-50 border border-green-300 text-green-500 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5"
                            placeholder="Enter Option 1(Enter here the correct option)"
                            required
                            onChange={(e) => onChangeHandler(e)}
                            value={formData?.option1}
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
                            onChange={(e) => onChangeHandler(e)}
                            value={formData?.option2}
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
                            onChange={(e) => onChangeHandler(e)}
                            value={formData?.option3}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <input
                            type="text"
                            name="option4"
                            id="option4"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Enter Option 4"
                            quired
                            value={formData?.option4}
                            onChange={(e) => onChangeHandler(e)}
                          />
                        </div>
                        <div className="col-span-6 sm:col-span-3">
                          <select
                            type="text"
                            name="level"
                            id="level"
                            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            required
                            onChange={(e) => onChangeHandler(e)}
                            value={formData?.level}
                          >
                            <option disabled>Select Level</option>
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
                            onChange={(e) => onChangeHandler(e)}
                            value={formData?.language}
                          >
                            <option disabled>Select Language</option>
                            <option value="english">English</option>
                            <option value="hindi">Hindi</option>
                            <option value="french">French</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        onClick={submitHandler}
                      >
                        Update Question
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EditQuestion;
