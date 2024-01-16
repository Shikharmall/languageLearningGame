import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import img1 from "../images/user.png";
import Loaderimage from "../images/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import { API_URL_BASE } from "../utils/apiURL";
import { getAllUsersDetailsAPI } from "../Api/UserAPI/UserAPI";

const LeaderboardTable = ({
  //societydata,
  postsPerPage,
  totalPosts,
  paginate,
  currentPage,
  data1,
  data2,
  Loader,
  indexOfFirstPost,
  indexOfLastPost,
  rowperpage,
}) => {
  const pageNumbers = [];

  const [societydata, setSocietyData] = useState([]);

  const [userData, setUserData] = useState([]);

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getAllUsersDetailsFunc = () => {
      //setLoader(true);
      getAllUsersDetailsAPI().then((res) => {
        if (res.status === 200) {
          //setLoader(false);
          setUserData(res?.data?.data);
        } else {
          console.log("Data Fetching Failed!");
        }
      });
    };
    getAllUsersDetailsFunc();
  }, []);

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  //const [sidebarOpen, setSidebarOpen] = useState(false);
  const [action, setAction] = useState(true);
  const [search, setSearch] = useState("");

  const filterhoadata = (e) => {
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

  const handleSelectChangerow = (e) => {
    rowperpage(e.target.value);
  };

  //console.log(societydata);

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
    <div className="relative sm:rounded-lg p-3" id="movetop">
      {action ? (
        <>
          <div className="flex flex-wrap items-center justify-between py-4 px-4 bg-white dark:bg-gray-800 rounded-tl-lg rounded-tr-lg">
            <div className="relative p-2">
              <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center text-blue-500 bg-white border border-blue-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-blue-200 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 m-1"
                type="button"
                onClick={() => {
                  setAction(false);
                }}
              >
                Add Society +
              </button>
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
                onChange={filterhoadata}
              />
            </div>
          </div>

          {Loader ? (
            <div className="w-full h-full">
              <div className="flex justify-center p-30 pb-10 bg-white dark:bg-gray-800">
                <img src={Loaderimage} alt="loader" className="w-20 h-20" />
              </div>
            </div>
          ) : (
            <>
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
                        Rank
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Score
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
                                {item.isVerified ? (
                                  <svg
                                    className="w-6 h-6 absolute top-5 left-6"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M21.5609 10.7386L20.2009 9.15859C19.9409 8.85859 19.7309 8.29859 19.7309 7.89859V6.19859C19.7309 5.13859 18.8609 4.26859 17.8009 4.26859H16.1009C15.7109 4.26859 15.1409 4.05859 14.8409 3.79859L13.2609 2.43859C12.5709 1.84859 11.4409 1.84859 10.7409 2.43859L9.17086 3.80859C8.87086 4.05859 8.30086 4.26859 7.91086 4.26859H6.18086C5.12086 4.26859 4.25086 5.13859 4.25086 6.19859V7.90859C4.25086 8.29859 4.04086 8.85859 3.79086 9.15859L2.44086 10.7486C1.86086 11.4386 1.86086 12.5586 2.44086 13.2486L3.79086 14.8386C4.04086 15.1386 4.25086 15.6986 4.25086 16.0886V17.7986C4.25086 18.8586 5.12086 19.7286 6.18086 19.7286H7.91086C8.30086 19.7286 8.87086 19.9386 9.17086 20.1986L10.7509 21.5586C11.4409 22.1486 12.5709 22.1486 13.2709 21.5586L14.8509 20.1986C15.1509 19.9386 15.7109 19.7286 16.1109 19.7286H17.8109C18.8709 19.7286 19.7409 18.8586 19.7409 17.7986V16.0986C19.7409 15.7086 19.9509 15.1386 20.2109 14.8386L21.5709 13.2586C22.1509 12.5686 22.1509 11.4286 21.5609 10.7386ZM16.1609 10.1086L11.3309 14.9386C11.1909 15.0786 11.0009 15.1586 10.8009 15.1586C10.6009 15.1586 10.4109 15.0786 10.2709 14.9386L7.85086 12.5186C7.56086 12.2286 7.56086 11.7486 7.85086 11.4586C8.14086 11.1686 8.62086 11.1686 8.91086 11.4586L10.8009 13.3486L15.1009 9.04859C15.3909 8.75859 15.8709 8.75859 16.1609 9.04859C16.4509 9.33859 16.4509 9.81859 16.1609 10.1086Z"
                                      fill="#2590EB"
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

                            <td className="px-6 py-4">{index + 1}</td>

                            <td className="px-6 py-4">
                              <div className="flex items-center">
                                {item.score}
                              </div>
                            </td>

                            <td className="px-6 py-4">
                              <NavLink
                                to={{
                                  pathname: `/society/societydetails/${item._id}`,
                                }}
                                className="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer"
                              >
                                View Society
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

                {societydata.length > 0 ? (
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
                      {societydata.length > 0 ? (
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
                      {societydata.length > 0 ? (
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
                      {societydata.length > 0 ? (
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
