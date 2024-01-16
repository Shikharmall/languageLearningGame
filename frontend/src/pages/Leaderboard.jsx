import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loaderimage from "../images/loader.gif";

import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import LeaderboardTable from "../components/LeaderboardTable";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (!isLogin) {
      navigate("/");
    }
  }, []);

  const [loader, setLoader] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <div className="flex h-screen overflow-hidden">
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
            <>
              <LeaderboardTable />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
