import React, { useEffect, useState } from "react";
import img1 from "../images/user.png";
import { Audio } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { API_URL_BASE } from "../utils/apiURL";
import { getAllUserDetailsByLanguageAPI } from "../Api/UserAPI/UserAPI";

const LeaderboardTable = () => {
  const pageNumbers = [];

  const [userData, setUserData] = useState([]);
  const [firstRankUserData, setFirstRankUserData] = useState({});

  const [loader, setLoader] = useState(true);
  const [language, setLanguage] = useState("all");

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
    paginate(1);
  };

  useEffect(() => {
    const getAllUsersDetailsFunc = (language) => {
      setLoader(true);
      getAllUserDetailsByLanguageAPI(language).then((res) => {
        if (res.status === 200) {
          setLoader(false);
          setUserData(res?.data?.data);
          setFirstRankUserData(res?.data?.data[0]);
        } else {
          console.log("Data Fetching Failed!");
        }
      });
    };
    getAllUsersDetailsFunc(language);
  }, [language]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPosts = userData.length;

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleSelectChangerow = (e) => {
    paginate(1);
    setPostsPerPage(e.target.value);
  };

  //const [sidebarOpen, setSidebarOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [search, setSearch] = useState("");

  const filterUserData = (e) => {
    setSearch(e.target.value);
    paginate(1);
  };

  const [formData, setFormData] = useState({
    societyName: "",
    societyAddress: {
      houseAddress1: "",
      streetAddress2: "",
      landmark: "",
      city: "",
      state: "",
      zipCode: "",
    },
    societyContactNumber: "",
    societyEmailAddress: "",
    societyType: "",
  });

  const onChangeHandlerAddress = (e) => {
    setFormData({
      ...formData,
      societyAddress: {
        ...formData.societyAddress,
        [e.target.name]: e.target.value,
      },
    });
  };

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
    addSociety(formData).then((res) => {
      console.log(res);
      if (res.status === 200) {
        //setLoad(false);
        //logger.info(formData.societyName+' Added By Dashboard Admin.');

        setFormData({
          societyName: "",
          societyAddress: {
            houseAddress1: "",
            streetAddress2: "",
            landmark: "",
            city: "",
            state: "",
            zipCode: "",
          },
          societyContactNumber: "",
          societyEmailAddress: "",
          societyType: "",
        });

        toast("Society Added!");
        data1();
        data2();
      } else {
        toast(res.response.data.message);
      }
    });
  };

  useEffect(() => {
    const myDiv = document.getElementById("movetop");
    myDiv.style.overflowX = "auto";
    myDiv.scrollTop = 0;
    myDiv.style.overflowX = "";
  }, [action]);

  const filteredUserData = userData
    .filter((item) => {
      return (
        search.toLowerCase() === "" ||
        item?.name?.toLowerCase().includes(search.toLowerCase()) ||
        item?.email?.toLowerCase().includes(search.toLowerCase())
        //||
        //item?.score?.toLowerCase().includes(search.toLowerCase())
        // || item.societyAddress.state.toLowerCase().includes(search.toLowerCase())
      );
    })
    .slice(indexOfFirstPost, indexOfLastPost);

  console.log(filteredUserData);

  return (
    <div className="relative sm:rounded-lg p-3 w-full h-full" id="movetop">
      {action ? (
        <>
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
                    id="table-search-users"
                    className="block p-2 pl-10 text-sm text-blue-500 border border-blue-300 placeholder-blue-400 rounded-lg w-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 box-border"
                    placeholder="Search for users"
                    value={search}
                    onChange={filterUserData}
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
                        User Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Global Rank
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Global Score
                      </th>
                      <th scope="col" className="px-6 py-3">
                        View
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {filteredUserData && filteredUserData.length > 0
                      ? filteredUserData.map((item, index) => (
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
                                <img
                                  className="rounded-full"
                                  src={img1}
                                  alt="Jese image"
                                />
                                {item._id === firstRankUserData._id ? (
                                  <svg
                                    className="w-8 h-8 absolute left-1"
                                    style={{ top: -25 }}
                                    version="1.1"
                                    id="Layer_1"
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 128 128"
                                    enable-background="new 0 0 128 128"
                                    xml:space="preserve"
                                  >
                                    <path
                                      fill="#FFA000"
                                      d="M112,36c-6.629,0-12,5.375-12,12c0,1.68,0.352,3.273,0.973,4.727L84,60L69.801,34.445
                                      C73.48,32.391,76,28.508,76,24c0-6.625-5.371-12-12-12s-12,5.375-12,12c0,4.508,2.52,8.391,6.199,10.445L44,60l-16.973-7.273
                                      C27.648,51.273,28,49.68,28,48c0-6.625-5.371-12-12-12S4,41.375,4,48s5.371,12,12,12c0.93,0,1.822-0.133,2.695-0.328L28,100v8
                                      c0,4.422,3.582,8,8,8h56c4.418,0,8-3.578,8-8v-8l9.309-40.328C110.176,59.875,111.07,60,112,60c6.629,0,12-5.375,12-12
                                      S118.629,36,112,36z M64,20c2.207,0,4,1.797,4,4s-1.793,4-4,4s-4-1.797-4-4S61.793,20,64,20z M12,48c0-2.203,1.793-4,4-4
                                      s4,1.797,4,4s-1.793,4-4,4S12,50.203,12,48z M92,108H36v-8h56V108z M93.633,92H34.367L27.34,61.563l13.508,5.789
                                      C41.871,67.789,42.941,68,43.996,68c2.828,0,5.547-1.5,6.996-4.117L64,40.477l13.008,23.406C78.457,66.5,81.176,68,84.004,68
                                      c1.055,0,2.125-0.211,3.148-0.648l13.508-5.789L93.633,92z M112,52c-2.207,0-4-1.797-4-4s1.793-4,4-4s4,1.797,4,4S114.207,52,112,52
                                      z"
                                    />
                                  </svg>
                                ) : null}
                              </div>

                              <div className="pl-3">
                                <div className="text-base font-semibold">
                                  {item.name}
                                </div>
                                <div className="font-normal text-gray-500">
                                  {item.email}
                                </div>
                              </div>
                            </th>

                            <td className="px-6 py-4">#{index + 1}</td>

                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {language === "all"
                                  ? Number(item.englishScore) +
                                    Number(item.hindiScore) +
                                    Number(item.frenchScore)
                                  : null}
                                {language === "english"
                                  ? item.englishScore
                                  : null}
                                {language === "hindi" ? item.hindiScore : null}
                                {language === "french"
                                  ? item.frenchScore
                                  : null}
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <NavLink
                                to={{
                                  pathname: `/publicUserdetails/${item._id}`,
                                }}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                              >
                                View User
                              </NavLink>
                            </td>
                          </tr>
                        ))
                      : null}
                  </tbody>
                </table>
              </div>

              {filteredUserData && filteredUserData.length > 0 ? null : (
                <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 flex justify-center">
                  <h1 className="p-3">No User Found</h1>
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

                {userData.length > 0 ? (
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
                      {userData.length > 0 ? (
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
                      {userData.length > 0 ? (
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
                      {userData.length > 0 ? (
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
        </>
      ) : (
        <div className="flex items-center justify-center">
          <div className="relative w-full max-w-2xl max-h-full ">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 className="text-xl font-semibold text-gray-700 dark:text-white">
                  Add Society
                </h3>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="editUserModal"
                  onClick={() => {
                    setAction(true);
                    //logger.info('Societies List Page Opened.');
                    logger.info({
                      event_type: "Open Page",
                      event_action: "Page Opened",
                      event_description: "Societies List Page Opened.",
                      //role_assigned: "Dashboard Admin",
                      log_message: "Societies List Page Opened.",
                      api_called: JSON.stringify([
                        `${API_URL_BASE}/society/unverified-socities`,
                        `${API_URL_BASE}/society/verified-socities`,
                      ]),
                      status_of_log: true,
                    });
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
              </div>
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="first-name"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Society Name
                    </label>
                    <input
                      type="text"
                      name="societyName"
                      id="first-name"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Society Name"
                      required
                      onChange={onChangeHandler}
                      value={formData.societyName}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="societyEmailAddress"
                      id="email"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="example@company.com"
                      required
                      onChange={onChangeHandler}
                      value={formData.societyEmailAddress}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="phone-number"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Phone Number
                    </label>
                    <input
                      type="number"
                      name="societyContactNumber"
                      id="phone-number"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="e.g. +(12)3456 789"
                      required
                      onChange={onChangeHandler}
                      value={formData.societyContactNumber}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="department"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address Line1.{" "}
                    </label>
                    <input
                      type="text"
                      name="houseAddress1"
                      id="department"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Address Line1.."
                      required
                      onChange={onChangeHandlerAddress}
                      value={formData.societyAddress.houseAddress1}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="department"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Address Line2.{" "}
                    </label>
                    <input
                      type="text"
                      name="streetAddress2"
                      id="department"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Address Line2.."
                      required
                      onChange={onChangeHandlerAddress}
                      value={formData.societyAddress.streetAddress2}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="current-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Landmark
                    </label>
                    <input
                      type="text"
                      name="landmark"
                      id="societyType"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter landmark"
                      required
                      onChange={onChangeHandlerAddress}
                      value={formData.societyAddress.landmark}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="current-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Pin Code
                    </label>
                    <input
                      type="number"
                      name="zipCode"
                      id="societyType"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Society Pincode"
                      required
                      onChange={onChangeHandlerAddress}
                      value={formData.societyAddress.zipCode}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="department"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      id="department"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter City.."
                      required
                      onChange={onChangeHandlerAddress}
                      value={formData.societyAddress.city}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="department"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      id="department"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter State.."
                      required
                      onChange={onChangeHandlerAddress}
                      value={formData.societyAddress.state}
                    />
                  </div>

                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="current-password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Society Type
                    </label>
                    <input
                      type="text"
                      name="societyType"
                      id="societyType"
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Enter Society Type"
                      required
                      onChange={onChangeHandler}
                      value={formData.societyType}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  onClick={submitHandler}
                >
                  Add Society
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeaderboardTable;
