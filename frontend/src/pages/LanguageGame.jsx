import React, { useEffect, useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import img1 from "../images/city.png";
import Loaderimage from "../images/loader.gif";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Modalpopup from "../components/Modalpopup";

const LanguageGame = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLogin = localStorage.getItem("isLogin");

    if (!isLogin) {
      navigate("/");
    }
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const filterhoadata = (e) => {
    setSearch(e.target.value);
    paginate(1);
  };

  const handleSelectChangerow = (e) => {
    setPostsPerPage(e.target.value);
  };

  const [language, setLanguage] = useState("english"); // State to store the selected category

  // Function to handle changes in the selected category
  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <div
            className="relative sm:rounded-lg p-3 w-full h-full"
            id="movetop"
          >

            <div className="flex flex-wrap items-center justify-between py-4 px-4 bg-white w-full h-full rounded-md">
              <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex items-center justify-center">
                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <h1 className="text-gray-800 text-3xl title-font font-medium mb-1">
                      Language Learning Game
                    </h1>
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      Game Instruction
                    </h2>

                    <p className="leading-relaxed">
                      1. You will be given 60 seconds(i.e. 1 min). <br />
                      2. You have to attempt maximum number of questions. <br />
                      3. You will have three level of question i.e. easy(of 
                      points), medium(of 3 points) & hard(of 5 points). <br />
                      4. Based on your score, you will be assign global rank.
                    </p>
                    <div className="flex mt-2 items-center pb-2 border-b-2 border-gray-200 mb-5"></div>
                    <div className="flex justify-center">
                      <select
                        type="text"
                        name="language"
                        id="language"
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full m-1 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                        onChange={(e) => handleLanguageChange(e)}
                        value={language}
                      >
                        <option disabled>
                          Select Language
                        </option>
                        <option value="english">English</option>
                        <option value="hindi">Hindi</option>
                        <option value="french">French</option>
                      </select>
                      <button
                        //onClick={submitHandler}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSearchModalOpen(true);
                        }}
                        type="submit"
                        className="text-white bg-blue-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm m-1 px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                      >
                        Start Game
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modalpopup
        id="search-modal"
        searchId="search"
        modalOpen={searchModalOpen}
        setModalOpen={setSearchModalOpen}
        language={language}
      />
    </>
  );
};

export default LanguageGame;
