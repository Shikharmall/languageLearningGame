import React, { useState, useEffect } from "react";
import { NavLink, useParams, useLocation } from "react-router-dom";
//import { getsociety } from "../Api/SocietyDetailsAPI";

export default function Navigation() {
  const { society_id } = useParams();
  const location = useLocation();
  const { pathname } = location;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const [isHovered1, setIsHovered1] = useState(false);

  const handleMouseEnter1 = () => {
    setIsHovered1(true);
  };

  const handleMouseLeave1 = () => {
    setIsHovered1(false);
  };

  const [societyid, setSocietyid] = useState("");
  const [showsocietydetails, setShowsocietydetails] = useState("");

  const societydetails = (id) => {
    if (id !== "") {
      try {
        getsociety(id).then((res) => {
          if (res.status === 200) {
            setShowsocietydetails(res.data.data);
          } else {
            console.log("error");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (society_id) {
      setSocietyid(society_id);
      societydetails(society_id);
    }
  }, [society_id]);

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 bg-white">
      <ul className="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        {" "}
        <li className="mr-2">
          <NavLink
            to={{ pathname: `/admin/allquestions` }}
            //className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            className={`fill-current ${
              pathname === "/" ||
              (pathname.includes("admin") && pathname.includes("allquestions"))
                ? "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                : "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            }`}
          >
            <svg
              //className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              className={`fill-current ${
                pathname === "/" ||
                (pathname.includes("admin") && pathname.includes("allquestions"))
                  ? "w-4 h-4 mr-2 text-blue-600 dark:text-blue-500"
                  : "w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 18"
            >
              <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
            </svg>
            All Questions
          </NavLink>
        </li>
        <li className="mr-2">
          <NavLink
            to={{ pathname: `/admin/addquestions` }}
            //className="inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            className={`fill-current ${
              pathname === "/" ||
              (pathname.includes("admin") && pathname.includes("addquestions"))
                ? "inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group"
                : "inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group"
            }`}
          >
            <svg
              //className="w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              className={`fill-current ${
                pathname === "/" ||
                (pathname.includes("admin") && pathname.includes("addquestions"))
                  ? "w-4 h-4 mr-2 text-blue-600 dark:text-blue-500"
                  : "w-4 h-4 mr-2 text-gray-400 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300"
              }`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 18 20"
            >
              <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
            </svg>
            Add Questions
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
