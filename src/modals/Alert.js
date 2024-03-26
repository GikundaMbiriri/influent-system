import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineCheck } from "react-icons/ai";
import { BsDot } from "react-icons/bs";

function Alert({ setShowAlert }) {
  return (
    <>
      <div
        className="fixed w-full inset-0 z-10 overflow-hidden flex justify-center items-end md:items-center animated fadeIn faster"
        style={{ background: "rgba(0,0,0,.6)" }}
      >
        <div className="shadow-xl modal-container bg-white overflow-y-scroll text-black w-full md:w-2/3 lg:w-2/3 xl:w-3/5 mx-auto rounded-t-lg md:rounded-lg z-100  max-h-full">
          <div className=" text-left">
            <div className="flex w-full justify-between items-center p-2">
              <div className="  text-center font-semibold text-xl  text-[#F70800] ">
                System Alert
              </div>
              <div
                className="  bg-gray-200 p-1 hover:text-black rounded-md cursor-pointer"
                onClick={() => setShowAlert(false)}
              >
                <AiOutlineClose className="" />
              </div>
            </div>
            <div className="px-3 pb-6">
              <div className=" text-lg font-semibold">
                System Blockage!! Please Check!
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Alert;
