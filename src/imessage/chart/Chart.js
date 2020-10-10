import "./Chart.css";
import React, { useEffect, useState } from "react";
import { IconButton } from "@material-ui/core";
import MicNone from "@material-ui/icons/MicNone";
import Messages from "./messages/Messages";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import { selectChartName, selectId } from "../../features/chartSlice";
import db from "../../firebase/firebase";
import { selectUser } from "../../features/userSlice";
import firebase from "firebase";
function Chart() {
  var chartName = useSelector(selectChartName);
  const chartId = useSelector(selectId);
  const user = useSelector(selectUser);

  const [message, setMessage] = useState("");
  const [charts, setCharts] = useState([]);

  const [firstchartName, setfirstchartName] = useState("");
  const sendMessage = (e) => {
    e.preventDefault();
    if (chartId && message) {
      db.collection("charts").doc(chartId).collection("messages").add({
        msg: message,
        displayName: user?.displayName,
        photourl: user?.photourl,
        uid: user?.uid,
        time: firebase.firestore.FieldValue.serverTimestamp(),
      });
    }
    setMessage("");
  };

  useEffect(() => {
    db.collection("charts").onSnapshot((snapshot) => {
      if (snapshot) {
        const mydata = snapshot.docs[0].data();

        setfirstchartName(mydata?.chartName);

        updatecharts(snapshot.docs[0].id);
      }
    });
  }, []);

  useEffect(() => {
    if (chartId) {
      updatecharts(chartId);
    }
  }, [chartId]);

  const updatecharts = (chartId) => {
    db.collection("charts")
      .doc(chartId)
      .collection("messages")
      .onSnapshot((snapshot) => {
        setCharts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  };
  return (
    <div className="chart">
      <div className="chart_header">
        <h4>
          To:{" "}
          <span className="chart_name">
            {chartName != null ? chartName : firstchartName && firstchartName}
          </span>
        </h4>
        <strong>Details</strong>
      </div>

      <div className="chart_message">
        <FlipMove>
          {charts?.map((chart) => (
            <Messages key={chart.id} context={chart.data} />
          ))}
        </FlipMove>
      </div>

      <div className="chart_input">
        <form>
          <input
            placeholder="iMessage"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></input>
          <button onClick={sendMessage}>Send Message</button>
        </form>
        <IconButton>
          <MicNone></MicNone>
        </IconButton>
      </div>
    </div>
  );
}

export default Chart;
