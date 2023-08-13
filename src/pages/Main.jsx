import React, { useEffect, useMemo } from "react";

// charts
import { Cell, Pie, PieChart, Tooltip } from "recharts";

// icons
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { CgMoveTask } from "react-icons/cg";
import { GiPlainCircle } from "react-icons/gi";

// routes
import { Link } from "react-router-dom";
import { ROUTES } from "../Routes/constants";
import { getUserData } from "../auth/jwtService";
import { useDispatch, useSelector } from "react-redux";
import { getUserStatisticsForAdmin } from "../features/testResults/testResultsSlice";

import ReactECharts from "echarts-for-react";

import { useState } from "react";

const Main = () => {
  const [canShowBar, setCanShowBar] = useState(false);
  const COLORS = ["#1d89e4", "#ffcf00"];

  const dispatch = useDispatch();
  const { userStatisticsForAdmin } = useSelector(
    ({ testResults }) => testResults
  );

  const adminData = [
    {
      name: "Count of correct answers",
      value: userStatisticsForAdmin?.correct_answer_count,
    },
    {
      name: "Count of incorrect answers",
      value: userStatisticsForAdmin?.worning_count,
    },
  ];

  const studentData = [
    {
      name: "Count of correct answers",
      value: userStatisticsForAdmin?.correct_answer_count,
    },
    {
      name: "Count of incorrect answers",
      value: userStatisticsForAdmin?.worning_count,
    },
  ];

  let option = useMemo(() => {
    return {
      title: {
        text: "",
        subtext: "",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["Users count"],
      },
      toolbox: {
        show: true,
        feature: {
          dataView: { show: true, readOnly: false },
          magicType: { show: true, type: ["line", "bar"] },
          restore: { show: true },
          saveAsImage: { show: true },
        },
      },
      calculable: true,

      xAxis: {
        type: "category",
        data: [],
        axisLabel: {
          interval: 0,
          fontSize: "10",
        },
      },

      yAxis: [
        {
          type: "value",
        },
      ],
      series: {
        name: "Number of students",
        type: "bar",
        data: [],
        markPoint: {
          data: [
            {
              name: "Your point",
              value: null,
              xAxis: null,
              yAxis: null,
              itemStyle: {
                color: "yellow",
              },
            },
            {
              name: "Minimum point",
              value: 196,
              xAxis: 3,
              yAxis: 1,
              itemStyle: {
                color: "black",
              },
            },
          ],
        },
      },
    };
  }, []);

  useEffect(() => {
    dispatch(getUserStatisticsForAdmin({ id: getUserData().id }));
  }, [dispatch]);

  useEffect(() => {
    if (userStatisticsForAdmin.result) {
      setCanShowBar(true);
      option.xAxis.data = userStatisticsForAdmin.result.map(
        (x) => `${x.first_count}-${x.last_count}`
      );

      option.series.data = userStatisticsForAdmin.result.map(
        (series) => series.user_count
      );

      const maxValue = Math.max(...option.series.data);
      option.series.markPoint.data[1].yAxis = maxValue;

      const findIndex = userStatisticsForAdmin.result.findIndex(
        (obj) => obj.user_result !== 0
      );

      if (findIndex >= 0) {
        option.series.markPoint.data[0].xAxis = findIndex;

        option.series.markPoint.data[0].yAxis =
          userStatisticsForAdmin.result[findIndex].user_count;

        option.series.markPoint.data[0].value =
          userStatisticsForAdmin.result[findIndex].user_result;
      }
    }
  }, [userStatisticsForAdmin, option]);

  return (
    <section>
      <div className="flex items-center gap-8">
        <div className="card w-1/2">
          <div className="flex items-center gap-5">
            <MdOutlinePlaylistAdd size="30" className="text-primary" />
            <h1 className="text-xl">Custom Tests</h1>
          </div>
          <p className="my-5">
            Configure custom tests by choosing test modes, number of questions,
            subjects, and systems.
          </p>
          <Link
            to={ROUTES.CUSTOMTEST}
            className="btn-primary font-semibold btn-small block w-fit"
          >
            CREATE CUSTOM TEST
          </Link>
        </div>

        <div className="card w-1/2">
          <div className="flex items-center gap-5">
            <CgMoveTask size="30" className="text-primary" />
            <h1 className="text-xl">Learning Paths</h1>
          </div>
          <p className="my-5">
            Prepare for your exam with schedules, practice exams, and
            self-assessments created by teaching experts.
          </p>
          <Link
            to={ROUTES.CUSTOMTEST}
            className="btn-primary font-semibold btn-small block w-fit"
          >
            PREPARE FOR YOUR EXAM
          </Link>
        </div>
      </div>

      <div className="card mt-8">
        {getUserData().role === "admin" ? (
          <>
            <h1 className="text-xl mb-5">Performance & Adaptive Review</h1>
            <div className="flex item-center gap-12 justify-between">
              <div className="flex items-center  gap-10">
                <PieChart width={180} height={200}>
                  <Pie
                    data={adminData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {adminData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <div>
                  <h2 className="text-lg mb-5">Your accuracy:</h2>
                  <ul>
                    <li className="flex items-center gap-3">
                      <GiPlainCircle className="mt-1 text-primary" size="20" />
                      <span>
                        Correct answers:{" "}
                        <b>
                          {userStatisticsForAdmin?.correct_answer_interest}%
                        </b>
                      </span>
                    </li>
                    <li className="flex items-center gap-3 mt-2">
                      <GiPlainCircle className="mt-1 text-yellow" size="20" />
                      <span>
                        Incorrect answers:{" "}
                        <b>{userStatisticsForAdmin?.worning_interest}%</b>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-10 w-7/12">
                {canShowBar && (
                  <ReactECharts
                    option={option}
                    style={{ height: "300px", width: "100%" }}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-xl mb-5">Performance & Adaptive Review</h1>
            <div className="flex item-center gap-8">
              <div className="flex items-center gap-10 w-1/2">
                <PieChart width={180} height={200}>
                  <Pie
                    data={studentData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {studentData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
                <div>
                  <h2 className="text-lg mb-5">Your accuracy:</h2>
                  <ul>
                    <li className="flex items-center gap-3 ">
                      <GiPlainCircle className="mt-1 text-primary" size="20" />
                      <span>
                        {" "}
                        Correct answers:{" "}
                        <b>
                          {userStatisticsForAdmin?.correct_answer_interest}%
                        </b>
                      </span>
                    </li>
                    <li className="flex items-center gap-3 mt-2">
                      <GiPlainCircle className="mt-1 text-yellow" size="20" />
                      <span>
                        {" "}
                        Incorrect answers:{" "}
                        <b>{userStatisticsForAdmin?.worning_interest}%</b>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-10 w-1/2">
                {canShowBar && (
                  <ReactECharts
                    option={option}
                    style={{ height: "300px", width: "100%" }}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Main;
