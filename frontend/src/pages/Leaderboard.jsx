import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Audio } from "react-loader-spinner";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import LeaderboardTable from "../components/LeaderboardTable";
import { useSelector } from "react-redux";

function Dashboard() {
  const navigate = useNavigate();

  //useEffect(() => {
  //  const isLogin = localStorage.getItem("isLogin");
  //  if (!isLogin) {
  //    navigate("/");
  //  }
  //}, []);

  const [loader, setLoader] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (!isLogin) {
      navigate("/");
    }
  }, [isLogin]);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <LeaderboardTable />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
