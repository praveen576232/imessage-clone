import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import db from "../../firebase/firebase";
import "./Sidebarchart.css";
import {setCharts} from '../../features/chartSlice'
function Sidebarchart({ chartName, id }) {
  const [chart, setChart] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      db.collection("charts")
        .doc(id)
        .collection("messages")
        .orderBy("time","desc")
        .onSnapshot((snapshot) => {
          setChart(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }
  }, [id]);
  return (
    <div
      onClick={() => {
        dispatch(setCharts({
           
            chartName: chartName,
            id:id,
          }));
      }}
      className="sidebarchart"
    >
      <Avatar
        src={chart && chart[0]?.data?.photourl}
        className="sidebarchart_avatar"
      />
      <div className="sidebarchart_info">
        <div className="sidebarchart_namedate">
          <h3>{chartName}</h3>
          <small>{chart && chart[0]?.data?.time && new Date(chart[0]?.data?.time?.toDate()).toLocaleString()}</small>
        </div>
        <p>{chart && chart[0]?.data?.msg}</p>
      </div>
    </div>
  );
}

export default Sidebarchart;
