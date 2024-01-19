import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { Audio } from "react-loader-spinner";
import img2 from "../images/userr.png";
import "../css/default.css";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAllUserDetailsByLanguageAPI,
  getAllUsersDetailsAPI,
  getUserDetailsAPI,
} from "../Api/UserAPI/UserAPI";
import Progress from "../components/Progress";
import UserInformation from "../components/UserInformation";

const UserDetails = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (!isLogin) {
      navigate("/");
    }
  }, []);

  const { user_id } = useParams();

  const [data, setData] = useState({});

  const [rank, setRank] = useState(0);

  const [loader, setLoader] = useState(true);

  /* useEffect(() => {
    const getUserDetailsFunc = (user_id) => {
      //setLoader(true);
      getUserDetailsAPI(user_id).then((res) => {
        if (res.status === 200) {
          //setLoader(false);
          setData(res?.data?.data);
        } else {
          console.log("Data Fetching Failed!");
        }
      });
    };
    getUserDetailsFunc(user_id);
  }, [user_id]);*/

  const getUserDetailsFunc = async (userId) => {
    try {
      const res = await getUserDetailsAPI(userId);
      if (res.status === 200) {
        setData(res?.data?.data);
      } else {
        console.error("Data Fetching Failed!");
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
    }
  };

  useEffect(() => {
    getUserDetailsFunc(user_id);
  }, [user_id]);

  console.log(data);

  useEffect(() => {
    console.log("Effect running...");
    // Your code
  }, [user_id]);

  const [userData, setUserData] = useState([]);

  /*const getAllUsersDetailsFunc = () => {
    getAllUserDetailsByLanguageAPI("all").then((res) => {
      if (res.status === 200) {
        setUserData(res?.data?.data);
        let rank = 0;
        userData.forEach(function (obj) {
          if (obj._id === data._id) {
            //break;
            setRank(rank + 1);
            setLoader(false);
            return;
          } else {
            rank = Number(rank) + 1;
          }
        });
      } else {
        console.log("Data Fetching Failed!");
      }
    });
  };

  useEffect(() => {
    getAllUsersDetailsFunc();
  }, [userData, data._id]);*/

  const getAllUsersDetailsFunc = () => {
    getAllUserDetailsByLanguageAPI("all").then((res) => {
      if (res.status === 200) {
        setUserData(res?.data?.data);
      } else {
        console.log("Data Fetching Failed!");
      }
    });
  };

  useEffect(() => {
    getAllUsersDetailsFunc();
  }, []);

  useEffect(() => {
    if (userData && data._id) {
      const foundUser = userData.find((obj) => obj._id === data._id);

      if (foundUser) {
        const userRank = userData.indexOf(foundUser) + 1;
        setRank(userRank);
        setLoader(false);
      }
    }
  }, [userData, data._id]);

  const [sidebarOpen, setSidebarOpen] = useState(false);

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

          <div
            className="relative sm:rounded-lg p-3 w-full h-full"
            id="movetop"
          >
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
                <div className="flex flex-row flex-wrap" id="changeflex">
                  <div className=" p-2 w-2/6" id="changeflex2">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 p-5">
                      <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">
                          Profile Image
                        </h3>
                        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                          {data?.name}
                          <span className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300 ml-2">
                            <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                            Global Rank- #{rank}
                          </span>
                        </p>
                      </div>
                      <br />
                      <ul className="flex items-center justify-center">
                        {data?.image !== "N/A" ? (
                          <img
                            src={data?.image}
                            alt="profile-pic"
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
                  </div>

                  <div className="p-2 w-4/6" id="changeflex1">
                    <UserInformation data={data} />

                    <br />

                    <Progress data={data} />
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
