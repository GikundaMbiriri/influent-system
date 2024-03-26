import React, { useState, useEffect } from "react";
import { CiTempHigh } from "react-icons/ci";
import { CgOverflow } from "react-icons/cg";
import { WiHumidity } from "react-icons/wi";
import { AiOutlineColumnHeight } from "react-icons/ai";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCkYaMDM76LlEJgRdzyWyD6oHxb0gyZsF8",
  authDomain: "influentmonitor.firebaseapp.com",
  databaseURL: "https://influentmonitor-default-rtdb.firebaseio.com",
  projectId: "influentmonitor",
  storageBucket: "influentmonitor.appspot.com",
  messagingSenderId: "436156211845",
  appId: "1:436156211845:web:d5cfe5cdbe0fcd1b3a3fec",
  measurementId: "G-GGY19R38L9",
};
const app = initializeApp(firebaseConfig);
// Initialize firebase database and get the reference of firebase database object.
const database = getDatabase(app);

const sensorData = ref(database, "/");
function CardSection() {
  const [pData, setPData] = useState();
  const [flowRate, setFlowRate] = useState();

  useEffect(() => {
    return onValue(sensorData, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        let fRate = (
          8.19 -
          3.09 * 0.1312335958 * 0.028316832 * Math.pow(data.Depth, 1 / 0.667)
        ).toFixed(2);

        if (fRate <= 0) {
          setFlowRate(0);
        } else {
          setFlowRate(fRate);
        }
        setPData(data);
      } else {
        console.log("Data not found");
      }
    });
  }, []);
  return (
    <div className=" flex  justify-between px-10 pt-10 text-white ">
      <div className="   p-2 bg-green flex flex-col space-y-4  rounded-lg shadow-lg ">
        <div className="flex items-center space-x-8">
          <div className=" text-xl font-semibold">Temperature</div>
          <div className="">
            <CiTempHigh className="text-4xl" />
          </div>
        </div>
        <div className=" text-lg">{pData?.Temperature} C</div>
      </div>
      <div className="   p-2 bg-yellow flex flex-col space-y-4  rounded-lg shadow-lg ">
        <div className="flex items-center space-x-8">
          <div className=" text-xl font-semibold">Flow rate</div>
          <div className="">
            <CgOverflow className="text-4xl" />
          </div>
        </div>
        <div className=" text-lg">{flowRate}</div>
      </div>
      <div className="   p-2 bg-blue flex flex-col space-y-4  rounded-lg shadow-lg ">
        <div className="flex items-center space-x-8">
          <div className=" text-xl font-semibold">pH</div>
          <div className="">
            <WiHumidity className="text-4xl" />
          </div>
        </div>
        <div className=" text-lg"> {pData?.pHvalue}</div>
      </div>
      <div className="   p-2 bg-green flex flex-col space-y-4  rounded-lg shadow-lg ">
        <div className="flex items-center space-x-8">
          <div className=" text-xl font-semibold">Depth</div>
          <div className="">
            <AiOutlineColumnHeight className="text-4xl" />
          </div>
        </div>
        <div className=" text-lg">{(9.07 - pData?.Depth).toFixed(2)}</div>
      </div>
    </div>
  );
}

export default CardSection;
