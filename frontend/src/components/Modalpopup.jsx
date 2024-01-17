import React, { useRef, useEffect, useState } from "react";
import Transition from "../utils/Transition";
import Timer from "./Timer";
import { Audio } from "react-loader-spinner";
import { getQuestionAPI } from "../Api/QuestionAPI/QuestionAPI";
import { updateScoreAPI } from "../Api/RankAPI/RankAPI";

function ModalSearch({ id, modalOpen, setModalOpen, language }) {
  const modalContent = useRef(null);
  const searchInput = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!modalOpen || modalContent.current.contains(target)) return;
      setModalOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!modalOpen || keyCode !== 27) return;
      setModalOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    modalOpen && searchInput.current.focus();
  }, [modalOpen]);

  const [questionData, setQuestionData] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [loader, setLoader] = useState(true);
  const [questionPoint, setQuestionPoint] = useState(0);
  const [loader1, setLoader1] = useState(false);

  const getAllUsersDetailsFunc = (language) => {
    setLoader(true);
    getQuestionAPI(language).then((res) => {
      if (res.status === 200) {
        setLoader(false);
        //console.log(res?.data?.data);
        setQuestionData(res?.data?.data);
        if (res?.data?.data?.level === "easy") {
          setQuestionPoint(1);
        } else if (res?.data?.data?.level === "medium") {
          setQuestionPoint(3);
        } else {
          setQuestionPoint(5);
        }
      } else {
        console.log("Data Fetching Failed!");
      }
    });
  };
  useEffect(() => {
    getAllUsersDetailsFunc(language);
    localStorage.setItem("score", 0);
  }, [language]);

  const recall = () => {
    if (selectedOption === questionData?.correctOption) {
      let score = localStorage.getItem("score");
      score = Number(score) + Number(questionPoint);
      localStorage.setItem("score", score);
    }
    setIsAnswered(false);
    getAllUsersDetailsFunc(language);
  };

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (event) => {
    setIsAnswered(true);
    setSelectedOption(event.target.value);
  };

  const [formData, setFormData] = useState({
    user_id: "",
    score: "",
  });

  const allScoreToUserFunc = () => {
    setLoader(true);
    const scoree = localStorage.getItem("score");
    const user_idd = localStorage.getItem("user_id");
    setFormData({ ...formData, user_id: user_idd, score: scoree });
    updateScoreAPI(formData).then((res) => {
      if (res.status === 201) {
        setLoader(false);
        localStorage.setItem("score", 0);
        setModalOpen(false);
      } else {
        console.log("Data Update Failed!");
      }
    });
  };

  return (
    <>
      {/* Modal backdrop */}
      <Transition
        className="fixed inset-0 bg-slate-900 bg-opacity-30 z-50 transition-opacity"
        show={modalOpen}
        enter="transition ease-out duration-200"
        enterStart="opacity-0"
        enterEnd="opacity-100"
        leave="transition ease-out duration-100"
        leaveStart="opacity-100"
        leaveEnd="opacity-0"
        aria-hidden="true"
      />
      {/* Modal dialog */}
      <Transition
        id={id}
        className="fixed inset-0 z-50 overflow-hidden flex items-start top-0 justify-center"
        role="dialog"
        aria-modal="true"
        show={modalOpen}
        enter="transition ease-in-out duration-200"
        enterStart="opacity-0 translate-y-4"
        enterEnd="opacity-100 translate-y-0"
        leave="transition ease-in-out duration-200"
        leaveStart="opacity-100 translate-y-0"
        leaveEnd="opacity-0 translate-y-4"
      >
        <div
          ref={modalContent}
          className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 overflow-auto w-full h-full"
        >
          <div
            className="py-4 px-2 w-full h-full"
            id="movetop"
            ref={searchInput}
          >
            <div className="flex justify-end items-center">
              <button
                //onClick={submitHandler}
                onClick={(e) => {
                  e.stopPropagation();
                  allScoreToUserFunc();
                  //setModalOpen(false);
                }}
                type="submit"
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
              >
                End Game
              </button>
              {modalOpen ? (
                <Timer allScoreToUserFunc={allScoreToUserFunc} />
              ) : null}
            </div>

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
              <section class="text-gray-700 body-font overflow-hidden bg-white">
                <div class="container px-5 py-24 mx-auto">
                  <div class="mx-auto flex items-center justify-center">
                    <div class="w-full">
                      <h1 class="text-gray-800 text-3xl title-font font-medium mb-1">
                        {questionData.question}
                      </h1>
                      <br />
                      <h2 class="text-sm title-font text-gray-500 tracking-widest">
                        Level- {questionData.level}
                      </h2>
                      <br />

                      <p class="leading-relaxed">
                        <div>
                          <div className="flex items-center">
                            {isAnswered ? (
                              <input
                                type="radio"
                                value={questionData?.option1}
                                checked={
                                  selectedOption === questionData?.option1
                                }
                                onChange={handleOptionChange}
                                className="m-1"
                                disabled
                              />
                            ) : (
                              <input
                                type="radio"
                                value={questionData?.option1}
                                checked={
                                  selectedOption === questionData?.option1
                                }
                                onChange={handleOptionChange}
                                className="m-1"
                              />
                            )}
                            <p
                              className="m-1"
                              style={{ opacity: isAnswered ? 1 : 0.5 }}
                            >
                              1. {questionData?.option1}
                            </p>
                          </div>
                          <div className="flex items-center">
                            {isAnswered ? (
                              <input
                                type="radio"
                                value={questionData?.option2}
                                checked={
                                  selectedOption === questionData?.option2
                                }
                                onChange={handleOptionChange}
                                className="m-1"
                                disabled
                              />
                            ) : (
                              <input
                                type="radio"
                                value={questionData?.option2}
                                checked={
                                  selectedOption === questionData?.option2
                                }
                                onChange={handleOptionChange}
                                className="m-1"
                              />
                            )}
                            <p
                              className="m-1"
                              style={{ opacity: isAnswered ? 1 : 0.5 }}
                            >
                              2. {questionData?.option2}
                            </p>
                          </div>
                          <div className="flex items-center">
                            {isAnswered ? (
                              <input
                                type="radio"
                                value={questionData?.option3}
                                checked={
                                  selectedOption === questionData?.option3
                                }
                                onChange={handleOptionChange}
                                className="m-1"
                                disabled
                              />
                            ) : (
                              <input
                                type="radio"
                                value={questionData?.option3}
                                checked={
                                  selectedOption === questionData?.option3
                                }
                                onChange={handleOptionChange}
                                className="m-1"
                              />
                            )}
                            <p
                              className="m-1"
                              style={{ opacity: isAnswered ? 1 : 0.5 }}
                            >
                              3. {questionData?.option3}
                            </p>
                          </div>
                          <div className="flex items-center">
                            {isAnswered ? (
                              <input
                                type="radio"
                                value={questionData?.option4}
                                checked={
                                  selectedOption === questionData?.option4
                                }
                                onChange={handleOptionChange}
                                className="m-1"
                                //disabled={!isAnswered}
                                disabled
                              />
                            ) : (
                              <input
                                type="radio"
                                value={questionData?.option4}
                                checked={
                                  selectedOption === questionData?.option4
                                }
                                onChange={handleOptionChange}
                                className="m-1"
                                //disabled={!isAnswered}
                              />
                            )}
                            <p
                              className="m-1"
                              style={{ opacity: isAnswered ? 1 : 0.5 }}
                            >
                              4. {questionData?.option4}
                            </p>
                          </div>
                        </div>
                      </p>
                      {isAnswered ? (
                        <>
                          {selectedOption === questionData?.correctOption ? (
                            <>
                              <p class="leading-relaxed text-green-500">
                                Correct answer: {questionData?.correctOption}
                              </p>
                            </>
                          ) : (
                            <>
                              <p class="leading-relaxed text-red-500">
                                Wrong answer! Correct answer is{" "}
                                {questionData?.correctOption}
                              </p>
                            </>
                          )}
                        </>
                      ) : null}
                      <div class="flex mt-2 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                      <div class="flex justify-end">
                        <button
                          //onClick={submitHandler}
                          onClick={(e) => {
                            e.stopPropagation();
                            //setSearchModalOpen(true);
                            recall();
                          }}
                          type="submit"
                          className="text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                        >
                          Next
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </Transition>
    </>
  );
}

export default ModalSearch;
