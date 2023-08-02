import React, { useEffect } from "react";
import "../styles/progressbar.css";
import { useSelector } from "react-redux";

const MultiColorProgressBar = ({ readings }) => {
  let values =
    readings &&
    readings.length &&
    readings.map(function (item, i) {
      if (item.value > 0) {
        return (
          <div
            className="value"
            style={{ color: item.color, width: item.value + "%" }}
            key={i}
          >
            <span>{item.value}%</span>
          </div>
        );
      }
    }, this);

  let calibrations =
    readings &&
    readings.length &&
    readings.map(function (item, i) {
      if (item.value > 0) {
        return (
          <div
            className="graduation"
            style={{ color: item.color, width: item.value + "%" }}
            key={i}
          >
            <span>|</span>
          </div>
        );
      }
    }, this);

  let bars =
    readings &&
    readings.length &&
    readings.map(function (item, i) {
      if (item.value > 0) {
        return (
          <div
            className="bar"
            style={{ backgroundColor: item.color, width: item.value + "%" }}
            key={i}
          ></div>
        );
      }
    }, this);

  let legends =
    readings &&
    readings.length &&
    readings.map(function (item, i) {
      if (item.value > 0) {
        return (
          <div className="legend" key={i}>
            <span className="dot" style={{ color: item.color }}>
              ●
            </span>
            <span className="label">{item.name}</span>
          </div>
        );
      }
    }, this);

  return (
    <div className="multicolor-bar">
      <div className="values">{values || null}</div>
      <div className="scale">{calibrations || null}</div>
      <div className="bars">{bars || null}</div>
      <div className="legends">{legends || null}</div>
    </div>
  );
};

const App = () => {
  const { testResults } = useSelector(({ testResults }) => testResults);

  useEffect(() => {
    // testResults.test_results
  }, []);

  const readings = [
    {
      name: "Correct",
      value: testResults?.correct_answer_interest,
      color: "#1d89e4",
    },
    {
      name: "Incorrect",
      value: testResults?.worning_interest,
      color: "#ffcf00",
    },
    {
      name: "unsolved",
      // value: 50,
      color: "#666666",
    },
  ];
  return (
    <div>
      {console.log(testResults)}
      <MultiColorProgressBar readings={readings} />
    </div>
  );
};

export default App;
