import React, { PureComponent, useState, useEffect } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

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
const data = [
  {
    name: "Day 1",
    temp: 40,
  },
  {
    name: "Day 2",
    temp: 30,
  },
  {
    name: "Day 3",
    temp: 20,
  },
  {
    name: "Day 4",
    temp: 27,
  },
  {
    name: "Day 5",
    temp: 10,
  },
];

function Charts() {
  const [pData, setPData] = useState();
  const [flowRate, setFlowRate] = useState();
  const [temperature1, setTemperature1] = useState([0, 0, 0, 0, 0]);
  const [pH1, setPH1] = useState([0, 0, 0, 0, 0]);
  const [flowRate1, setFlowRate1] = useState([0, 0, 0, 0, 0]);
  const [depth1, setDepth1] = useState([0, 0, 0, 0, 0]);
  const [temperatureChart, setTemperatureChart] = useState([]);

  useEffect(() => {
    return onValue(sensorData, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        let fRate =
          9.07 -
          (3.096 * 0.028316832 * Math.pow(data.Depth, 1 / 0.667)).toFixed(2);

        setFlowRate(fRate);
        setTemperature1((oldArray) => [data.Temperature, ...oldArray]);
        setPH1((oldArray) => [data.pHvalue, ...oldArray]);
        setDepth1((oldArray) => [data.Depth, ...oldArray]);
        setFlowRate1((oldArray) => [fRate, ...oldArray]);

        setPData(data);
      } else {
        console.log("Data not found");
      }
    });
  }, []);
  useEffect(() => {
    const firstFiveItems = temperature1.slice(0, 5);
    firstFiveItems.map((item, index) => {
      setTemperatureChart((oldArray) => [
        ...oldArray,
        { temp: item, name: `Day ${index + 1}` },
      ]);
    });
  }, []);

  return (
    <div className=" flex flex-col spae-y-4 pt-10">
      {console.log(temperatureChart)}
      <div className=" flex space-x-2">
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            width={500}
            height={300}
            data={[
              {
                temp: temperature1[0],
                name: "Day 1",
              },
              {
                temp: temperature1[1],
                name: "Day 2",
              },
              {
                temp: temperature1[2],
                name: "Day 3",
              },
              {
                temp: temperature1[3],
                name: "Day 4",
              },
              {
                temp: temperature1[4],
                name: "Day 5",
              },
            ]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            width={500}
            height={300}
            data={[
              {
                flowrate: flowRate1[0],
                name: "Day 1",
              },
              {
                flowrate: flowRate1[1],
                name: "Day 2",
              },
              {
                flowrate: flowRate1[2],
                name: "Day 3",
              },
              {
                flowrate: flowRate1[3],
                name: "Day 4",
              },
              {
                flowrate: flowRate1[4],
                name: "Day 5",
              },
            ]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="flowrate" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className=" flex space-x-2">
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            width={500}
            height={300}
            data={[
              {
                pH: pH1[0],
                name: "Day 1",
              },
              {
                pH: pH1[1],
                name: "Day 2",
              },
              {
                pH: pH1[2],
                name: "Day 3",
              },
              {
                pH: pH1[3],
                name: "Day 4",
              },
              {
                pH: pH1[4],
                name: "Day 5",
              },
            ]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="pH" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
        <ResponsiveContainer width="100%" aspect={3}>
          <LineChart
            width={500}
            height={300}
            data={[
              {
                depth: depth1[0],
                name: "Day 1",
              },
              {
                depth: depth1[1],
                name: "Day 2",
              },
              {
                depth: depth1[2],
                name: "Day 3",
              },
              {
                depth: depth1[3],
                name: "Day 4",
              },
              {
                depth: depth1[4],
                name: "Day 5",
              },
            ]}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />

            <Line type="monotone" dataKey="depth" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Charts;
