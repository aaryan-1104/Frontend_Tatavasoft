import React from "react";
import bookContext from "../context/bookContext";
import { useContext } from "react";

const Alert = () => {
  const context = useContext(bookContext);
  const { alert } = context;

  return (
    (alert.status && alert.type === "danger" && (
      <div className="bg-white text-center py-4 lg:px-4 fixed">
        <div
          className="p-2 bg-red-200 items-center text-gray-700 leading-none lg:rounded-full flex lg:inline-flex fixed"
          role="alert"
          style={{ width: "98%" }}
        >
          <span className="flex rounded-full bg-red-400 uppercase px-2 py-1 text-xs font-bold mr-3">
            Alert
          </span>
          <span className="font-semibold mr-2 text-left flex-auto">
            {alert.msg}
          </span>
        </div>
      </div>
    )) ||
    (alert.status && alert.type === "success" && (
      <div className="bg-white text-center py-4 lg:px-4 fixed">
        <div
          className="bg-teal-100 border-t-4 border-teal-500 rounded-b text-teal-900 px-4 py-3 shadow-md fixed"
          role="alert"
          style={{ width: "98%" }}
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">{alert.msg}</p>
            </div>
          </div>
        </div>
      </div>
    ))
  );
};

export default Alert;
