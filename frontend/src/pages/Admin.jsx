import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import NoAccess from "../components/NoAccess";
import { Audio } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { getUserDetailsAPI } from "../Api/UserAPI/UserAPI";
import QuestionForm from "../components/QuestionForm";
import Navigation from "../partials/Navigation";
import { useSelector } from "react-redux";

const Admin = () => {
  const navigate = useNavigate();
  //useEffect(() => {
  //  const isLogin = localStorage.getItem("isLogin");
  //  if (!isLogin) {
  //    navigate("/");
  //  }
  //}, []);

  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin]);

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

          <Navigation />

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
            <>{data?.isAdmin ? <QuestionForm /> : <NoAccess />}</>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
