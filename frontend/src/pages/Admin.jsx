import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import NoAccess from "../components/NoAccess";

import Loaderimage from "../images/loader.gif";
import img2 from "../images/userr.png";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { getUserDetailsAPI } from "../Api/UserAPI/UserAPI";
import QuestionForm from "../components/QuestionForm";

const Admin = () => {
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
      setLoader(true);
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

          {loader ? (
            <div className="flex justify-center items-center w-full h-full overflow-hidden">
              <img src={Loaderimage} alt="loader" className="w-20 h-20" />
            </div>
          ) : (
            <>{data?.isAdmin ? <QuestionForm /> : <NoAccess />}</>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
