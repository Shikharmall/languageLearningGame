import React, { useEffect, useState } from "react";
import img1 from "../images/user.png";
import { Audio } from "react-loader-spinner";
import { NavLink } from "react-router-dom";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Navigation from "../partials/Navigation";
import { getAllQuestionsAPI } from "../Api/QuestionAPI/QuestionAPI";

const AllQuestions = () => {
  const pageNumbers = [];

  const [questionData, setQuestionData] = useState([]);

  const [loader, setLoader] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [language, setLanguage] = useState("all");
  const [level, setLevel] = useState("all");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleLevelChange = (e) => {
    setLevel(e.target.value);
  };

  useEffect(() => {
    const getAllQuestionsFunc = (language,level) => {
      //setLoader(true);
      getAllQuestionsAPI(language,level).then((res) => {
        if (res.status === 200) {
          setLoader(false);
          setQuestionData(res?.data?.data);
        } else {
          console.log("Data Fetching Failed!");
        }
      });
    };
    getAllQuestionsFunc(language,level);
  }, [language,level]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPosts = questionData.length;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSelectChangerow = (e) => {
    setPostsPerPage(e.target.value);
  };
  const [search, setSearch] = useState("");

  const filterQuestionData = (e) => {
    setSearch(e.target.value);
    paginate(1);
  };

  const filteredQuestionData = questionData
    .filter((item) => {
      return (
        search.toLowerCase() === "" ||
        item?.question?.toLowerCase().includes(search.toLowerCase()) ||
        item?.option1?.toLowerCase().includes(search.toLowerCase()) ||
        item?.option2?.toLowerCase().includes(search.toLowerCase()) ||
        item?.option3?.toLowerCase().includes(search.toLowerCase()) ||
        item?.option4?.toLowerCase().includes(search.toLowerCase())
      );
    })
    .slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/*  Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <Navigation />

        <div className="relative sm:rounded-lg p-3 w-full h-full" id="movetop">
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
            <>
              <div className="flex flex-wrap items-center justify-end py-4 px-4 bg-white dark:bg-gray-800 rounded-tl-lg rounded-tr-lg">
                <div className="relative p-2">
                  <select
                    type="text"
                    name="language"
                    id="language"
                    className="inline-flex items-center text-blue-500 bg-white border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 m-1"
                    //required

                    onChange={(e) => handleLanguageChange(e)}
                    value={language}
                  >
                    <option disabled>Select Language</option>
                    <option value="all">All Language</option>
                    <option value="english">English</option>
                    <option value="hindi">Hindi</option>
                    <option value="french">French</option>
                  </select>
                </div>
                <div className="relative p-2">
                  <select
                    type="text"
                    name="language"
                    id="language"
                    className="inline-flex items-center text-blue-500 bg-white border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 m-1"
                    //required
                    onChange={(e) => handleLevelChange(e)}
                    value={level}
                  >
                    <option disabled>Select Level</option>
                    <option value="all">All Level</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div className="relative p-2 box-border">
                  <label htmlFor="table-search" className="sr-only">
                    Search
                  </label>
                  <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-blue-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    id="table-search-questions"
                    className="block p-2 pl-10 text-sm text-blue-500 border border-blue-300 placeholder-blue-400 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 box-border"
                    placeholder="Search for questions"
                    value={search}
                    onChange={filterQuestionData}
                  />
                </div>
              </div>
              <div className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="p-4">
                        <div className="flex items-center">
                          <input
                            id="checkbox-all-search"
                            type="checkbox"
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            disabled
                          />
                          <label
                            htmlFor="checkbox-all-search"
                            className="sr-only"
                          >
                            checkbox
                          </label>
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Question
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Level
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 flex items-center flex-col"
                      >
                        Option 1 <br />{" "}
                        <span className="text-green-500">(Correct Option)</span>
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Option 2
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Option 3
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Option 4
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredQuestionData && filteredQuestionData.length > 0
                      ? filteredQuestionData.map((item, index) => (
                          <tr
                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            key={index}
                          >
                            <td className="w-4 p-4">
                              <div className="flex items-center">
                                <input
                                  id="checkbox-table-search-1"
                                  type="checkbox"
                                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                  disabled
                                />
                                <label
                                  htmlFor="checkbox-table-search-1"
                                  className="sr-only"
                                >
                                  checkbox
                                </label>
                              </div>
                            </td>

                            <th
                              scope="row"
                              className="flex items-center px-6 py-4 text-gray-900 whitespace-nowrap dark:text-white"
                            >
                              <div className="relative w-10 h-10">
                                {/*<img
                                      className="rounded-full"
                                      src={img1}
                                      alt="Jese image"
                                    />*/}
                                <svg
                                  fill="#000000"
                                  className="w-10 h-10"
                                  viewBox="0 0 512 512"
                                  id="_17_Question"
                                  data-name="17 Question"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    id="Path_22"
                                    data-name="Path 22"
                                    d="M256,512C114.625,512,0,397.391,0,256,0,114.625,114.625,0,256,0S512,114.625,512,256C512,397.391,397.375,512,256,512Zm0-448C149.969,64,64,149.969,64,256s85.969,192,192,192,192-85.969,192-192S362.031,64,256,64Z"
                                    fillRule="evenodd"
                                  />
                                  <path
                                    id="Path_23"
                                    data-name="Path 23"
                                    d="M256,128a96,96,0,0,0-96,96h64a32,32,0,1,1,32,32H240a16,16,0,0,0-16,16v48h64v-5.875c37.188-13.219,64-48.391,64-90.125A96,96,0,0,0,256,128Z"
                                    fillRule="evenodd"
                                  />
                                  <path
                                    id="Path_24"
                                    data-name="Path 24"
                                    d="M256,352H224v32h64V352Z"
                                    fillRule="evenodd"
                                  />
                                </svg>
                              </div>

                              <div className="pl-3">
                                <div className="text-base font-semibold">
                                  {item?.question?.substring(0, 15)}...
                                </div>
                                <div className="font-normal text-gray-500 uppercase">
                                  {item.language}
                                </div>
                              </div>
                            </th>

                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {item.level}
                              </div>
                            </td>

                            <td className="px-6 py-4 flex items-center flex-col">
                              <div className="flex items-center">
                                {item.option1}
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {item.option2}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {item.option3}
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {item.option4}
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <NavLink
                                to={{
                                  pathname: `/admin/editquestion/${item._id}`,
                                }}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                              >
                                Edit Question
                              </NavLink>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>

              {filteredQuestionData &&
              filteredQuestionData.length > 0 ? null : (
                <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex justify-center">
                  <h1 className="p-3">No Question Found</h1>
                </div>
              )}

              <div
                className="flex flex-row justify-end p-2 bg-white dark:bg-gray-800 rounded-bl-lg rounded-br-lg"
                id="flextorow"
              >
                <a
                  className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                  id="toogle"
                >
                  Rows per page
                </a>

                <div className="flex items-center justify-center leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                  <select
                    name="rowsperpage"
                    id="rowsperpage"
                    className="pt-1 pb-1 pl-3 pr-7 border border-gray-300 rounded"
                    value={postsPerPage}
                    onChange={handleSelectChangerow}
                  >
                    <option value="10">10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="200">200</option>
                  </select>
                </div>

                {questionData.length > 0 ? (
                  <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    {currentPage} of {Math.ceil(totalPosts / postsPerPage)}
                  </a>
                ) : (
                  <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    0 of 0
                  </a>
                )}

                <nav aria-label="Page navigation example">
                  <ul className="inline-flex -space-x-px text-sm">
                    <li>
                      {questionData.length > 0 ? (
                        <>
                          {currentPage === 1 ? (
                            <a
                              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer"
                              onClick={() =>
                                paginate(Math.ceil(totalPosts / postsPerPage))
                              }
                            >
                              Previous
                            </a>
                          ) : (
                            <a
                              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer"
                              onClick={() => paginate(currentPage - 1)}
                            >
                              Previous
                            </a>
                          )}
                        </>
                      ) : (
                        <a className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer">
                          Previous
                        </a>
                      )}
                    </li>

                    <li>
                      {questionData.length > 0 ? (
                        <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white">
                          {currentPage}
                        </a>
                      ) : (
                        <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white">
                          0
                        </a>
                      )}
                    </li>

                    <li>
                      {questionData.length > 0 ? (
                        <>
                          {currentPage ===
                          Math.ceil(totalPosts / postsPerPage) ? (
                            <a
                              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer"
                              onClick={() => paginate(1)}
                            >
                              Next
                            </a>
                          ) : (
                            <a
                              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer"
                              onClick={() => paginate(currentPage + 1)}
                            >
                              Next
                            </a>
                          )}
                        </>
                      ) : (
                        <a className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover-bg-gray-100 hover-text-gray-700 dark-bg-gray-800 dark-border-gray-700 dark-text-gray-400 dark-hover-bg-gray-700 dark-hover-text-white cursor-pointer">
                          Next
                        </a>
                      )}
                    </li>
                  </ul>
                </nav>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllQuestions;
