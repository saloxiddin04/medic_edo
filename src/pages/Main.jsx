import React from "react";

// charts
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// icons
import { MdOutlinePlaylistAdd } from "react-icons/md";
import { CgMoveTask } from "react-icons/cg";
import { GiPlainCircle } from "react-icons/gi";

// routes
import { Link } from "react-router-dom";
import { ROUTES } from "../Routes/constants";
import { getUserData } from "../auth/jwtService";

const Main = () => {
  const data = [
    { name: "Correct", value: 8 },
    { name: "Incorrect", value: 4 },
  ];

  const newData = [
    {
      name: "Page A",
      pv: 2400,
    },
    {
      name: "Page B",
      pv: 1398,
    },
    {
      name: "Page C",
      pv: 2000,
    },
  ];

  const COLORS = ["#1d89e4", "#ffcf00"];
  const COLORS2 = ["#1d89e4", "#ffcf00"];

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
            <div className="flex item-center gap-8">
              <div className="flex items-center gap-10 w-1/2">
                <PieChart width={180} height={200}>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
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
                      <span> Correct: 67%</span>
                    </li>
                    <li className="flex items-center gap-3 mt-2">
                      <GiPlainCircle className="mt-1 text-yellow" size="20" />
                      <span> Incorrect: 33% </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-10 w-1/2">
                <BarChart
                  width={300}
                  height={300}
                  data={newData}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                  barSize={50}
                >
                  <XAxis
                    dataKey="name"
                    scale="point"
                    padding={{ left: 10, right: 10 }}
                  />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Bar
                    dataKey="pv"
                    fill="#8884d8"
                    background={{ fill: "#eee" }}
                  />
                </BarChart>
                <div>
                  <h2 className="text-lg mb-5">Peer Comparison</h2>
                  <ul>
                    <li className="flex items-center gap-3 ">
                      <GiPlainCircle className="mt-1 text-primary" size="20" />
                      <span>Your accuracy: 20%</span>
                    </li>
                    <li className="flex items-center gap-3 mt-2">
                      <GiPlainCircle className="mt-1 text-yellow" size="20" />
                      <span>Peers accuracy: 50%</span>
                    </li>
                  </ul>
                </div>
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
                    data={data}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
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
                      <span> Correct: 67%</span>
                    </li>
                    <li className="flex items-center gap-3 mt-2">
                      <GiPlainCircle className="mt-1 text-yellow" size="20" />
                      <span> Incorrect: 33% </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex items-center gap-10 w-1/2">
                <BarChart width={150} height={180} data={data}>
                  <Bar dataKey="value">
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS2[index % COLORS.length]}
                      />
                    ))}
                  </Bar>
                  <Tooltip />
                </BarChart>
                <div>
                  <h2 className="text-lg mb-5">Peer Comparison</h2>
                  <ul>
                    <li className="flex items-center gap-3 ">
                      <GiPlainCircle className="mt-1 text-primary" size="20" />
                      <span>Your accuracy: 20%</span>
                    </li>
                    <li className="flex items-center gap-3 mt-2">
                      <GiPlainCircle className="mt-1 text-yellow" size="20" />
                      <span>Peers accuracy: 50%</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Main;
