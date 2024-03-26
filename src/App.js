import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";
import Navbar from "./components/Navbar";
import CardSection from "./components/CardSection";
import Charts from "./components/Charts";

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

const sensorData = ref(database, "SensorData/");
export default function App() {
  onValue(sensorData, (snapshot) => {
    const data = snapshot.val();
    if (!!data) {
      console.log(data);
    } else {
      console.log("Data not found");
    }
  });
  return (
    <div className="">
      <Navbar />
      <CardSection />
      <Charts />
    </div>
  );
}
