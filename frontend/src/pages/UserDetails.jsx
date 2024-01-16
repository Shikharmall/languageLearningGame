import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";

import Loaderimage from "../images/loader.gif";
import img2 from "../images/userr.png";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getUserDetailsAPI } from "../Api/UserAPI/UserAPI";

const UserDetails = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (!isLogin) {
      navigate("/");
    }
  }, []);

  const user_id = localStorage.getItem("user_id");

  const [data, setData] = useState("");

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const getUserDetailsFunc = (user_id) => {
      //setLoader(true);
      getUserDetailsAPI(user_id).then((res) => {
        if (res.status === 200) {
          setLoader(false);
          setData(res?.data?.data);
        } else {
          console.log("Data Fetching Failed!");
        }
      });
    };
    getUserDetailsFunc(user_id);
  }, [user_id]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [memberdetaill, setMemberdetaill] = useState("");
  const [imgcontent, setImagecontent] = useState();

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/*<ToastContainer></ToastContainer>*/}
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          {/*<Navigation />*/}

          <div className="relative sm:rounded-lg p-3" id="movetop">
            <>
              {loader ? (
                <div className="flex justify-center items-center w-full h-full overflow-hidden">
                  <img src={Loaderimage} alt="loader" className="w-20 h-20" />
                </div>
              ) : (
                <div className="flex flex-row flex-wrap" id="changeflex">
                  <div className=" p-2 w-2/6" id="changeflex2">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-5">
                      <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                          Profile Image
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                          {data?.name}
                          <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 ml-2">
                            <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                            Hoa
                          </span>
                          {memberdetaill.role === "mdsAdmin" ? (
                            <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300 ml-2">
                              <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                              Hoa
                            </span>
                          ) : null}
                        </p>
                      </div>

                      <br />

                      <ul className="flex items-center justify-center">
                        {memberdetaill.profileImg ? (
                          <img
                            src={memberdetaill.profileImg.url}
                            alt={memberdetaill.profileImg.name}
                            className="w-60 h-60 rounded"
                          />
                        ) : (
                          <img
                            src={img2}
                            alt="profilelogo"
                            className="w-60 h-60 rounded"
                          />
                        )}
                      </ul>

                      <br />
                    </div>

                    <br />

                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                      <div className="flex items-center justify-center p-6 space-x-2 rounded-b dark:border-gray-600">
                        {memberdetaill.role === "mdsHead" ? (
                          <>
                            {memberdetaill.isMemberVerified === true ? (
                              <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                Verified
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  verifyhoa(memberdetaill._id);
                                  verifyMember(memberdetaill._id);
                                }}
                              >
                                Verify
                              </button>
                            )}
                          </>
                        ) : (
                          <>
                            {memberdetaill.isMemberVerified === true ? (
                              <button
                                type="submit"
                                className="text-white bg-blue-700 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                              >
                                Verified
                              </button>
                            ) : (
                              <>
                                <button
                                  type="submit"
                                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    verifyMember(memberdetaill._id);
                                  }}
                                >
                                  Verify
                                </button>
                              </>
                            )}
                          </>
                        )}

                        {memberdetaill.role === "mdsHead" ? (
                          <button
                            type="submit"
                            className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                          >
                            HOA
                          </button>
                        ) : (
                          <>
                            {memberdetaill.role === "mdsAdmin" ? (
                              <button
                                type="submit"
                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                                onClick={() =>
                                  removeFromAdmin1(memberdetaill._id)
                                }
                              >
                                Dismiss Admin
                              </button>
                            ) : (
                              <button
                                type="submit"
                                className="text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                                onClick={() =>
                                  changeToAdmin1(memberdetaill._id)
                                }
                              >
                                Make Admin
                              </button>
                            )}
                          </>
                        )}

                        {memberdetaill.role === "mdsHead" ? null : (
                          <button
                            type="submit"
                            className="text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMember();
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-2 w-4/6" id="changeflex1">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-5">
                      <div className="flex flex-row">
                        <div className="px-4 sm:px-0">
                          <h3 className="text-base font-semibold leading-7 text-gray-900">
                            User Information
                          </h3>
                          <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                            All details
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              Name
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {data?.name}
                            </dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              Phone Number
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              -
                            </dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              Email address
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              {data?.email}
                            </dd>
                          </div>
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              Password
                            </dt>
                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                              *********
                            </dd>
                          </div>
                          {/*<div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                              <dt className="text-sm font-medium leading-6 text-gray-900">Society Name</dt>
                              <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{showsocietydetails.societyName}</dd>
                            </div>*/}
                          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                            <dt className="text-sm font-medium leading-6 text-gray-900">
                              Attachments
                            </dt>
                            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                              <ul
                                role="list"
                                className="divide-y divide-gray-100 rounded-md border border-gray-200"
                              >
                                {memberdetaill.headDocuments &&
                                memberdetaill.headDocuments.length > 0 ? (
                                  memberdetaill.headDocuments.map(
                                    (value, index) => (
                                      <li
                                        className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6"
                                        key={index}
                                      >
                                        {/*documentSizes[value.document_url]*/}
                                        {value.document_type ===
                                        "aadhar_card" ? (
                                          <>
                                            <div className="flex w-0 flex-1 items-center">
                                              <svg
                                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">
                                                  Aadhar Card
                                                </span>
                                                {/*<span className="flex-shrink-0 text-gray-400">
                                                    2.4mb
                                                  </span>*/}
                                              </div>
                                            </div>

                                            <div className="ml-4 flex-shrink-0">
                                              <a
                                                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSearchModalOpen(true);
                                                  setImagecontent(
                                                    value.document_url
                                                  );
                                                }}
                                              >
                                                View Documents
                                              </a>
                                            </div>
                                          </>
                                        ) : null}
                                        {value.document_type === "pan_card" ? (
                                          <>
                                            <div className="flex w-0 flex-1 items-center">
                                              <svg
                                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">
                                                  Pan Card
                                                </span>
                                                {/*<span className="flex-shrink-0 text-gray-400">
                                                    2.4mb
                                                  </span>*/}
                                              </div>
                                            </div>

                                            <div className="ml-4 flex-shrink-0">
                                              <a
                                                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSearchModalOpen(true);
                                                  setImagecontent(
                                                    value.document_url
                                                  );
                                                }}
                                              >
                                                View Documents
                                              </a>
                                            </div>
                                          </>
                                        ) : null}
                                        {value.document_type ===
                                        "utility_bill" ? (
                                          <>
                                            <div className="flex w-0 flex-1 items-center">
                                              <svg
                                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">
                                                  Utility Bill
                                                </span>
                                                {/*<span className="flex-shrink-0 text-gray-400">
                                                    2.4mb
                                                  </span>*/}
                                              </div>
                                            </div>

                                            <div className="ml-4 flex-shrink-0">
                                              <a
                                                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSearchModalOpen(true);
                                                  setImagecontent(
                                                    value.document_url
                                                  );
                                                }}
                                              >
                                                View Documents
                                              </a>
                                            </div>
                                          </>
                                        ) : null}
                                        {value.document_type ===
                                        "proof_of_hoa" ? (
                                          <>
                                            <div className="flex w-0 flex-1 items-center">
                                              <svg
                                                className="h-5 w-5 flex-shrink-0 text-gray-400"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                                aria-hidden="true"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                              <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                                <span className="truncate font-medium">
                                                  Proof Of Hoa
                                                </span>
                                                {/*<span className="flex-shrink-0 text-gray-400">
                                                    2.4mb
                                                  </span>*/}
                                              </div>
                                            </div>

                                            <div className="ml-4 flex-shrink-0">
                                              <a
                                                className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  setSearchModalOpen(true);
                                                  setImagecontent(
                                                    value.document_url
                                                  );
                                                }}
                                              >
                                                View Documents
                                              </a>
                                            </div>
                                          </>
                                        ) : null}
                                      </li>
                                    )
                                  )
                                ) : (
                                  <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                                    <div className="flex w-0 flex-1 items-center">
                                      <svg
                                        className="h-5 w-5 flex-shrink-0 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                      <div className="ml-4 flex min-w-0 flex-1 gap-2">
                                        <span className="truncate font-medium">
                                          No Documents
                                        </span>
                                        <span className="flex-shrink-0 text-gray-400">
                                          0.0mb
                                        </span>
                                      </div>
                                    </div>
                                    <div className="ml-4 flex-shrink-0">
                                      <a className="font-medium text-indigo-600 hover:text-indigo-500">
                                        View Document
                                      </a>
                                    </div>
                                  </li>
                                )}
                              </ul>
                            </dd>
                          </div>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
