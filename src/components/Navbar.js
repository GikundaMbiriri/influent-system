import React, { useState, useEffect } from "react";
import { MdDirtyLens } from "react-icons/md";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import Alert from "../modals/Alert";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
} from "@react-pdf/renderer";
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
  },
  info: {
    flexDirection: "row",
    paddingTop: 10,
    marginRight: 5,
  },
  details: {
    paddingTop: 20,
    marginRight: 5,
  },
  title: {
    textAlign: "center",
    paddingBottom: 10,
  },
});
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
function Navbar() {
  const [pData, setPData] = useState();
  const [flowRate, setFlowRate] = useState();
  const [phRange, setPhRange] = useState();
  const [tempRange, setTempRange] = useState();
  const [showAlert, setShowAlert] = useState();

  const MyDoc = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Influent Monitor Report</Text>
          {phRange == "low" && tempRange == "low" && (
            <View>
              <Text>Retention time is long</Text>
              <Text>Microbial activity is low</Text>
            </View>
          )}
          {phRange == "low" && tempRange == "medium" && (
            <View>
              <Text>Retention time is medium</Text>
              <Text>Microbial activity is medium</Text>
            </View>
          )}
          {phRange == "low" && tempRange == "high" && (
            <View>
              <Text>Retention time is medium</Text>
              <Text>Microbial activity is high</Text>
            </View>
          )}
          {phRange == "medium" && tempRange == "low" && (
            <View>
              <Text>Retention time is medium</Text>
              <Text>Microbial activity is low</Text>
            </View>
          )}
          {phRange == "medium" && tempRange == "medium" && (
            <View>
              <Text>Retention time is medium</Text>
              <Text>Microbial activity is high</Text>
            </View>
          )}
          {phRange == "medium" && tempRange == "high" && (
            <View>
              <Text>Retention time is short</Text>
              <Text>Microbial activity is high</Text>
            </View>
          )}
          {phRange == "high" && tempRange == "low" && (
            <View>
              <Text>Retention time is long</Text>
              <Text>Microbial activity is low</Text>
            </View>
          )}
          {phRange == "high" && tempRange == "medium" && (
            <View>
              <Text>Retention time is medium</Text>
              <Text>Microbial activity is medium</Text>
            </View>
          )}
          {phRange == "high" && tempRange == "high" && (
            <View>
              <Text>Retention time is long</Text>
              <Text>Microbial activity is low</Text>
            </View>
          )}
          <View style={styles.info}>
            <Text>Temperature:</Text>
            <Text>{pData?.Temperature}</Text>
          </View>
          <View style={styles.info}>
            <Text>pH:</Text>
            <Text>{pData?.pHvalue}</Text>
          </View>
          <View style={styles.info}>
            <Text>flowRate:</Text>
            <Text>{flowRate}</Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.section}>
            <Text>pH</Text>
            <View style={styles.info}>
              <Text>Low</Text>
              <Text>0-6.5</Text>
            </View>
            <View style={styles.info}>
              <Text>Medium</Text>
              <Text>6.5-8.5</Text>
            </View>
            <View style={styles.info}>
              <Text>High</Text>
              <Text>8.5-14</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text>Temperature</Text>
            <View style={styles.info}>
              <Text>Low</Text>
              <Text>0-15</Text>
            </View>
            <View style={styles.info}>
              <Text>Medium</Text>
              <Text>15-30</Text>
            </View>
            <View style={styles.info}>
              <Text>High</Text>
              <Text>30-40</Text>
            </View>
          </View>
        </View>
        <View style={styles.details}>
          <Text>
            {" "}
            Low Retention == Low removal of total phosphorous and ammonium
            nitrogen.
          </Text>
          <Text>
            {" "}
            High Retention == High removal of total phosphorous and ammonium
            nitrogen.
          </Text>
        </View>
      </Page>
    </Document>
  );
  useEffect(() => {
    return onValue(sensorData, (snapshot) => {
      const data = snapshot.val();
      if (!!data) {
        let fRate = (
          8.19 -
          3.09 * 0.1312335958 * 0.028316832 * Math.pow(data.Depth, 1 / 0.667)
        ).toFixed(2);

        if (data?.pHvalue > 0 && data?.pHvalue <= 6.5) {
          setPhRange("low");
        }
        if (data?.pHvalue > 6.5 && data?.pHvalue <= 8.5) {
          setPhRange("medium");
        }
        if (data?.pHvalue > 8.5 && data?.pHvalue <= 14) {
          setPhRange("high");
        }
        if (data?.Temperature > 0 && data?.Temperature <= 15) {
          setTempRange("low");
        }
        if (data?.Temperature > 15 && data?.Temperature <= 30) {
          setTempRange("medium");
        }
        if (data?.Temperature > 30 && data?.Temperature <= 40) {
          setTempRange("high");
        }
        if (fRate <= 0) {
          setFlowRate(0);
          setShowAlert(true);
        }

        if (fRate > 0) {
          setFlowRate(fRate);
        }

        setPData(data);
      } else {
        console.log("Data not found");
      }
    });
  }, []);

  return (
    <div className=" bg-acqua-blue w-full py-2 px-4 flex justify-between text-white   ">
      <div className=" flex space-x-1  w-1/2 items-center">
        {console.log(`TEMP ${tempRange}`)}
        {console.log(phRange)}
        <div className=" text-white">
          <MdDirtyLens className=" text-4xl" />
        </div>
        <div className=" text-2xl font-semibold  px-4  py-1">
          Influent Monitor
        </div>
      </div>
      <div className=" flex w-1/2  space-x-6 items-center">
        <div className=" flex space-x-2 items-center ">
          <div className="">Temperature</div>
          <div className=" bg-white text-black p-0.5 px-1  text-sm rounded-full">
            {pData?.Temperature}
          </div>
        </div>
        <div className=" flex space-x-2 items-center">
          <div className="">Flow rate</div>
          <div className=" bg-white text-black p-0.5 px-1  text-sm rounded-full">
            {flowRate}
          </div>
        </div>
        <div className=" flex space-x-2 items-center">
          <div className="">pH</div>
          <div className=" bg-white text-black p-0.5 px-1  text-sm rounded-full">
            {pData?.pHvalue}
          </div>
        </div>
        <PDFDownloadLink document={<MyDoc />} fileName="report.pdf">
          {({ blob, url, loading, error }) =>
            loading ? "Loading document..." : "Download report!"
          }
        </PDFDownloadLink>
      </div>
      {showAlert && <Alert setShowAlert={setShowAlert} />}
    </div>
  );
}

export default Navbar;
