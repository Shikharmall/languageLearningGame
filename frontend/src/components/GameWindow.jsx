import React, { useRef, useEffect, useState } from "react";
import Transition from "../utils/Transition";
import Timer from "./Timer";
import { Audio } from "react-loader-spinner";
import { getQuestionAPI } from "../Api/QuestionAPI/QuestionAPI";
import { addResponseToUserAPI } from "../Api/ResponseAPI/ResponseAPI";

function ModalSearch({ id, modalOpen, setModalOpen, language }) {
  const [questionData, setQuestionData] = useState("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [loader, setLoader] = useState(true);
  const [questionPoint, setQuestionPoint] = useState(0);

  const [selectedOption, setSelectedOption] = useState(null);

  const getQuestionFunc = (language, score) => {
    setLoader(true);
    getQuestionAPI(language, score).then((res) => {
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

  const [formData, setFormData] = useState({
    user_id: "",
    score: "",
    easyCorrect: "",
    easyIncorrect: "",
    moderateCorrect: "",
    moderateIncorrect: "",
    hardCorrect: "",
    hardIncorrect: "",
    language: "",
  });
  const user_idd = localStorage.getItem("user_id");

  useEffect(() => {
    getQuestionFunc(language, 0);
    localStorage.setItem("score", 0);
    localStorage.setItem("easyCorrect", 0);
    localStorage.setItem("easyIncorrect", 0);
    localStorage.setItem("moderateCorrect", 0);
    localStorage.setItem("moderateIncorrect", 0);
    localStorage.setItem("hardCorrect", 0);
    localStorage.setItem("hardIncorrect", 0);
  }, [language]);

  const recall = () => {
    let score = localStorage.getItem("score");
    let easyCorrect = localStorage.getItem("easyCorrect");
    let easyIncorrect = localStorage.getItem("easyIncorrect");
    let moderateCorrect = localStorage.getItem("moderateCorrect");
    let moderateIncorrect = localStorage.getItem("moderateIncorrect");
    let hardCorrect = localStorage.getItem("hardCorrect");
    let hardIncorrect = localStorage.getItem("hardIncorrect");

    if (
      questionData?.level === "easy" &&
      selectedOption === questionData?.correctOption
    ) {
      score = Number(score) + Number(questionPoint);
      localStorage.setItem("score", score);

      easyCorrect = Number(easyCorrect) + 1;
      localStorage.setItem("easyCorrect", easyCorrect);
    } else if (
      questionData?.level === "easy" &&
      selectedOption !== questionData?.correctOption
    ) {
      easyIncorrect = Number(easyIncorrect) + 1;
      localStorage.setItem("easyIncorrect", easyIncorrect);
    }

    if (
      questionData?.level === "moderate" &&
      selectedOption === questionData?.correctOption
    ) {
      score = Number(score) + Number(questionPoint);
      localStorage.setItem("score", score);

      moderateCorrect = Number(moderateCorrect) + 1;
      localStorage.setItem("moderateCorrect", moderateCorrect);
    } else if (
      questionData?.level === "moderate" &&
      selectedOption !== questionData?.correctOption
    ) {
      moderateIncorrect = Number(moderateIncorrect) + 1;
      localStorage.setItem("moderateIncorrect", moderateIncorrect);
    }

    if (
      questionData?.level === "hard" &&
      selectedOption === questionData?.correctOption
    ) {
      score = Number(score) + Number(questionPoint);
      localStorage.setItem("score", score);

      hardCorrect = Number(hardCorrect) + 1;
      localStorage.setItem("hardCorrect", hardCorrect);
    } else if (
      questionData?.level === "hard" &&
      selectedOption !== questionData?.correctOption
    ) {
      hardIncorrect = Number(hardIncorrect) + 1;
      localStorage.setItem("hardIncorrect", hardIncorrect);
    }

    setIsAnswered(false);
    setSelectedOption(null);
    getQuestionFunc(language, score);
  };

  const [ranNumb, setRanNumb] = useState(1);

  useEffect(() => {
    setRanNumb(Math.floor(Math.random() * 4) + 1);
  }, [loader]);

  const handleOptionChange = (event) => {
    setIsAnswered(true);
    setSelectedOption(event.target.value);
  };

  const addResponseToUserFunc = () => {
    setLoader(true);
    let scoree = localStorage.getItem("score");
    let easyCorrect = localStorage.getItem("easyCorrect");
    let easyIncorrect = localStorage.getItem("easyIncorrect");
    let moderateCorrect = localStorage.getItem("moderateCorrect");
    let moderateIncorrect = localStorage.getItem("moderateIncorrect");
    let hardCorrect = localStorage.getItem("hardCorrect");
    let hardIncorrect = localStorage.getItem("hardIncorrect");
    setFormData((prevFormData) => ({
      ...prevFormData,
      score: scoree,
      easyCorrect: easyCorrect,
      easyIncorrect: easyIncorrect,
      moderateCorrect: moderateCorrect,
      moderateIncorrect: moderateIncorrect,
      hardCorrect: hardCorrect,
      hardIncorrect: hardIncorrect,
      language: language,
      user_id: user_idd,
    }));

    setFormData((updatedFormData) => {
      addResponseToUserAPI(updatedFormData).then((res) => {
        if (res.status === 201) {
          setLoader(false);
          localStorage.setItem("score", 0);
          localStorage.setItem("easyCorrect", "0");
          localStorage.setItem("easyIncorrect", "0");
          localStorage.setItem("moderateCorrect", "0");
          localStorage.setItem("moderateIncorrect", "0");
          localStorage.setItem("hardCorrect", "0");
          localStorage.setItem("hardIncorrect", "0");
          setModalOpen(false);
        } else {
          console.log("Data Update Failed!");
          console.log(res);
        }
      });
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
          //ref={modalContent}
          className="bg-white dark:bg-slate-800 border border-transparent dark:border-slate-700 overflow-auto w-full h-full"
        >
          <div
            className="py-4 px-2 w-full h-full"
            id="movetop"
            //ref={searchInput}
          >
            <div className="flex justify-end items-center">
              <button
                //onClick={submitHandler}
                onClick={(e) => {
                  e.stopPropagation();
                  addResponseToUserFunc();
                  //setModalOpen(false);
                }}
                type="submit"
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center m-2"
              >
                End Game
              </button>
              {modalOpen ? (
                <Timer addResponseToUserFunc={addResponseToUserFunc} />
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
              <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5 py-24 mx-auto">
                  <div className="mx-auto flex items-center justify-center">
                    <div className="w-full">
                      <h1 className="text-gray-800 text-3xl title-font font-medium mb-1">
                        {questionData.question}
                      </h1>
                      <br />
                      <h2 className="text-sm title-font text-gray-500 tracking-widest">
                        Level- {questionData.level}
                      </h2>
                      <br />

                      <div className="leading-relaxed">
                        {ranNumb === 1 ? (
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
                              {questionData?.option1}
                            </p>
                          </div>
                        ) : null}
                        <div className="flex items-center">
                          {isAnswered ? (
                            <input
                              type="radio"
                              value={questionData?.option2}
                              checked={selectedOption === questionData?.option2}
                              onChange={handleOptionChange}
                              className="m-1"
                              disabled
                            />
                          ) : (
                            <input
                              type="radio"
                              value={questionData?.option2}
                              checked={selectedOption === questionData?.option2}
                              onChange={handleOptionChange}
                              className="m-1"
                            />
                          )}
                          <p
                            className="m-1"
                            style={{ opacity: isAnswered ? 1 : 0.5 }}
                          >
                            {questionData?.option2}
                          </p>
                        </div>
                        {ranNumb === 2 ? (
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
                              {questionData?.option1}
                            </p>
                          </div>
                        ) : null}
                        <div className="flex items-center">
                          {isAnswered ? (
                            <input
                              type="radio"
                              value={questionData?.option3}
                              checked={selectedOption === questionData?.option3}
                              onChange={handleOptionChange}
                              className="m-1"
                              disabled
                            />
                          ) : (
                            <input
                              type="radio"
                              value={questionData?.option3}
                              checked={selectedOption === questionData?.option3}
                              onChange={handleOptionChange}
                              className="m-1"
                            />
                          )}
                          <p
                            className="m-1"
                            style={{ opacity: isAnswered ? 1 : 0.5 }}
                          >
                            {questionData?.option3}
                          </p>
                        </div>
                        {ranNumb === 3 ? (
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
                              {questionData?.option1}
                            </p>
                          </div>
                        ) : null}
                        <div className="flex items-center">
                          {isAnswered ? (
                            <input
                              type="radio"
                              value={questionData?.option4}
                              checked={selectedOption === questionData?.option4}
                              onChange={handleOptionChange}
                              className="m-1"
                              //disabled={!isAnswered}
                              disabled
                            />
                          ) : (
                            <input
                              type="radio"
                              value={questionData?.option4}
                              checked={selectedOption === questionData?.option4}
                              onChange={handleOptionChange}
                              className="m-1"
                              //disabled={!isAnswered}
                            />
                          )}
                          <p
                            className="m-1"
                            style={{ opacity: isAnswered ? 1 : 0.5 }}
                          >
                            {questionData?.option4}
                          </p>
                        </div>
                        {ranNumb === 4 ? (
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
                              {questionData?.option1}
                            </p>
                          </div>
                        ) : null}
                      </div>
                      {isAnswered ? (
                        <>
                          {selectedOption === questionData?.correctOption ? (
                            <>
                              <p className="leading-relaxed text-green-500">
                                Correct answer: {questionData?.correctOption}
                              </p>
                            </>
                          ) : (
                            <>
                              <p className="leading-relaxed text-red-500">
                                Wrong answer! Correct answer is{" "}
                                {questionData?.correctOption}
                              </p>
                            </>
                          )}
                        </>
                      ) : null}
                      <div className="flex mt-2 items-center pb-5 border-b-2 border-gray-200 mb-5"></div>
                      <div className="flex justify-end">
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
