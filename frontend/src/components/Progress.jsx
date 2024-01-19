import { useEffect, useState } from "react";
import {
  getUserResponseAPI,
  getUserResponseEnglishAPI,
  getUserResponseFrenchAPI,
  getUserResponseHindiAPI,
} from "../Api/ResponseAPI/ResponseAPI";

function Progress({ data }) {
  const user_id = data._id;

  const [response, setResponse] = useState("");
  const [responseEnglish, setResponseEnglish] = useState("");
  const [responseHindi, setResponseHindi] = useState("");
  const [responseFrench, setResponseFrench] = useState("");

  useEffect(() => {
    if (user_id) {
      const getUserResponseFunc = (user_id) => {
        //setLoader(true);
        getUserResponseAPI(user_id).then((res) => {
          if (res.status === 200) {
            //setLoader(false);
            setResponse(res?.data?.data);
          } else {
            console.log("Data Fetching Failed!");
          }
        });

        getUserResponseEnglishAPI(user_id).then((res) => {
          if (res.status === 200) {
            //setLoader(false);
            setResponseEnglish(res?.data?.data);
          } else {
            console.log("Data Fetching Failed!");
          }
        });

        getUserResponseHindiAPI(user_id).then((res) => {
          if (res.status === 200) {
            //setLoader(false);
            setResponseHindi(res?.data?.data);
          } else {
            console.log("Data Fetching Failed!");
          }
        });

        getUserResponseFrenchAPI(user_id).then((res) => {
          if (res.status === 200) {
            //setLoader(false);
            setResponseFrench(res?.data?.data);
          } else {
            console.log("Data Fetching Failed!");
          }
        });
      };
      getUserResponseFunc(user_id);
    }
  }, [user_id]);

  console.log(responseEnglish);

  const [englishWidth, setEnglishWidth] = useState(data?.englishScore);
  const [hindiWidth, setHindiWidth] = useState(data?.hindiScore);
  const [frenchWidth, setFrenchWidth] = useState(data?.frenchScore);

  const [englishPercentage, setEnglishPercentage] = useState(0);
  const [hindiPercentage, setHindiPercentage] = useState(0);
  const [frenchPercentage, setFrenchPercentage] = useState(0);

  useEffect(() => {
    const engper =
      (Number(englishWidth) /
        (Number(englishWidth) + Number(hindiWidth) + Number(frenchWidth))) *
      100;
    const hinper =
      (Number(hindiWidth) /
        (Number(englishWidth) + Number(hindiWidth) + Number(frenchWidth))) *
      100;
    const ferper =
      (Number(frenchWidth) /
        (Number(englishWidth) + Number(hindiWidth) + Number(frenchWidth))) *
      100;
    setEnglishPercentage(`${engper}%`);
    setHindiPercentage(`${hinper}%`);

    setFrenchPercentage(`${ferper}%`);
  }, [englishWidth, hindiWidth, frenchWidth]);

  return (
    <>
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <div className="flex flex-col items-center justify-center p-6 space-x-0 rounded-b dark:border-gray-600 ">
          <div className="relative w-full">
            <div className="px-4 sm:px-0 pb-2">
              <h3 className="text-base font-semibold leading-7 text-gray-900">
                Progress Report
              </h3>
            </div>
          </div>

          {Number(englishWidth) + Number(hindiWidth) + Number(frenchWidth) ===
          0 ? (
            <p className="text-base leading-7 text-gray-900">No Game Played!</p>
          ) : (
            <>
              <div className="w-full">
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Language Stats
                </p>
                <div className="overflow-hidden h-4 text-xs flex rounded w-full">
                  <div
                    style={{ width: englishPercentage }}
                    //style={{ width: "65%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500"
                  ></div>
                  <div
                    style={{ width: hindiPercentage }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                  <div
                    style={{ width: frenchPercentage }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
                <div className="flex flex-wrap m-0">
                  <div className="flex items-center m-1">
                    <span className="flex w-3 h-3 m-1 bg-orange-500 rounded-full"></span>{" "}
                    <p>English({englishPercentage})</p>
                  </div>
                  <div className="flex items-center m-1">
                    <span className="flex w-3 h-3 m-1 bg-blue-600 rounded-full"></span>{" "}
                    <p>Hindi({hindiPercentage})</p>
                  </div>
                  <div className="flex items-center m-1">
                    <span className="flex w-3 h-3 m-1 bg-green-500 rounded-full"></span>{" "}
                    <p>French({frenchPercentage})</p>
                  </div>
                </div>
              </div>
              <br />
              <div className="w-full">
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  English Language Stats
                </p>
                <div className="overflow-hidden h-4 text-xs flex rounded w-full">
                  <div
                    style={{ width: responseEnglish?.totalIncorrectPercentage }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                  ></div>
                  <div
                    style={{ width: responseEnglish?.totalCorrectPercentage }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
                <div className="flex flex-wrap m-0">
                  <div className="flex items-center m-1">
                    <span className="flex w-3 h-3 m-1 bg-red-500 rounded-full"></span>{" "}
                    <p>Wrong({responseEnglish?.totalIncorrectPercentage})</p>
                  </div>
                  <div className="flex items-center m-1">
                    <span className="flex w-3 h-3 m-1 bg-green-500 rounded-full"></span>{" "}
                    <p>Correct({responseEnglish?.totalCorrectPercentage})</p>
                  </div>
                </div>
              </div>
              <br />
              <div className="w-full">
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  Hindi Language Stats
                </p>
                <div className="overflow-hidden h-4 text-xs flex rounded w-full">
                  <div
                    style={{ width: responseHindi?.totalIncorrectPercentage }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                  ></div>
                  <div
                    style={{ width: responseHindi?.totalCorrectPercentage }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
                <div className="flex flex-wrap m-0">
                  <div className="flex items-center m-1">
                    <span className="flex w-3 h-3 m-1 bg-red-500 rounded-full"></span>{" "}
                    <p>Wrong({responseHindi?.totalIncorrectPercentage})</p>
                  </div>
                  <div className="flex items-center m-1">
                    <span className="flex w-3 h-3 m-1 bg-green-500 rounded-full"></span>{" "}
                    <p>Correct({responseHindi?.totalCorrectPercentage})</p>
                  </div>
                </div>
              </div>
              <br />
              <div className="w-full">
                <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                  French Language Stats
                </p>
                <div className="overflow-hidden h-4 text-xs flex rounded w-full">
                  <div
                    style={{ width: responseFrench?.totalIncorrectPercentage }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500"
                  ></div>
                  <div
                    style={{ width: responseFrench?.totalCorrectPercentage }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                  ></div>
                </div>
                <div className="flex flex-wrap m-0">
                  <div className="flex items-center m-1">
                    <span className="flex w-3 h-3 m-1 bg-red-500 rounded-full"></span>{" "}
                    <p>Wrong({responseFrench?.totalIncorrectPercentage})</p>
                  </div>
                  <div className="flex items-center m-1">
                    <span className="flex w-3 h-3 m-1 bg-green-500 rounded-full"></span>{" "}
                    <p>Correct({responseFrench?.totalCorrectPercentage})</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Progress;
