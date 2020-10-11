import "./Chart.css";
import React, { useEffect, useState } from "react";
import { Button, IconButton } from "@material-ui/core";
import MicNone from "@material-ui/icons/MicNone";
import Messages from "./messages/Messages";
import { useSelector } from "react-redux";
import FlipMove from "react-flip-move";
import { selectChartName, selectId } from "../../features/chartSlice";
import db from "../../firebase/firebase";
import { selectUser } from "../../features/userSlice";
import firebase from "firebase";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const mic = new SpeechRecognition();
mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";
function Chart() {
  var chartName = useSelector(selectChartName);
  const chartId = useSelector(selectId);
  const user = useSelector(selectUser);
  const [listening, setListennig] = useState(false);
  const [message, setMessage] = useState("");
  const [charts, setCharts] = useState([]);

  const [firstchartName, setfirstchartName] = useState("");
  const [firstchartId, setfirstchartId] = useState(null);
  const sendMessage = (e) => {
    e.preventDefault();

    if (chartId && message) {
      send(chartId);
    } else if (firstchartId && message) {
      send(firstchartId);
    }
    setMessage("");
  };

  const send = (id) => {
    db.collection("charts").doc(id).collection("messages").add({
      msg: message,
      displayName: user?.displayName,
      photourl: user?.photourl,
      uid: user?.uid,
      time: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  useEffect(() => {
    db.collection("charts").onSnapshot((snapshot) => {
      if (snapshot) {
        const mydata = snapshot?.docs[0]?.data();

        setfirstchartName(mydata?.chartName);

        setfirstchartId(snapshot?.docs[0]?.id);
        updatecharts(snapshot?.docs[0]?.id);
      }
    });
  }, []);

  useEffect(() => {
    if (chartId) {
      updatecharts(chartId);
      setfirstchartId(null);
    }
  }, [chartId]);

  useEffect(() => {
    if (listening) {
      mic.start();
      mic.onend = () => {
        mic.start();
      };
    } else {
      mic.stop();
      mic.onend = () => {
        setListennig(false);
      };
    }

    mic.onresult = (event) => {
      const result = Array.from(event.results);
      if (result) {
        setMessage(result[0][0].transcript);
      }
      mic.onerror = (event) => {
        alert("someting went wrong in your mic.");
      };
    };
  }, [listening]);

  const updatecharts = (chartId) => {
    db.collection("charts")
      .doc(chartId)
      .collection("messages")
      .orderBy("time", "desc")
      .onSnapshot((snapshot) => {
        setCharts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
  };

  const micmsg = () => {
    setListennig((previcestage) => !previcestage);
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
        <div
          className={`${
            listening ? "chart_input_mic-on" : "chart_input_mic-off"
          }  `}
        >
          <Button onClick ={() => setListennig(false)} className="mic-cancel-button">cancel</Button>
          <IconButton onClick={micmsg}>
            <MicNone></MicNone>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Chart;
