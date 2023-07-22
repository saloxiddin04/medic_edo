import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes/constants";
import { AiOutlineHome } from "react-icons/ai";
import ProgressBar from "../../components/ProgressBar";
import { Bar, BarChart, Cell, Pie, PieChart, Tooltip } from "recharts";
import { GiPlainCircle } from "react-icons/gi";

const Results = () => {
  const data = [
    { name: "Correct", value: 8 },
    { name: "Incorrect", value: 4 },
  ];

  const COLORS = ["#1d89e4", "#ffcf00"];
  const COLORS2 = ["#1d89e4", "#ffcf00"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="bg-[#f5f5f5] pb-10">
      <nav className="bg-white shadow-md flex items-center px-5 py-4">
        <Link to={ROUTES.MAIN}>
          <AiOutlineHome size="20" className="mt-0.5" />
        </Link>

        <h1 className="ml-5 text-xl">Test Results</h1>
      </nav>

      <section className="card w-8/12 mt-10 mx-auto">
        <div className="flex items-center justify-end gap-3">
          <span>Include omitted questions:</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div
              className="w-11 h-6 bg-gray-200 peer-focus:outline-none 
          rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"
            ></div>
          </label>
        </div>

        <div className="mt-10">
          <h1 className="text-xl font-semibold text-gray-600">
            Date: 01.06.2023 09:36 PM
          </h1>
          <h1 className=" text-gray-500">ID: 01589</h1>
          <h1 className="text-lg font-medium text-gray-600">
            5/40 answered, 4 correct
          </h1>
          <ProgressBar />
        </div>

        <div className="my-10">
          <div className="flex item-center gap-8">
            <div className="flex items-center gap-10 w-1/2">
              <PieChart width={180} height={200}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={renderCustomizedLabel}
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
        </div>

        <div>
          <h1 className="text-lg font-medium text-gray-600 mb-5">Details</h1>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Unique Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[{ id: 1, name: "Name", unique_name: "name_2" }].map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {item.unique_name}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-20">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Unique Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: 122, name: "Name", unique_name: "name_2" },
                { id: 125, name: "Name", unique_name: "name_2" },
              ].map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                    {item.unique_name}
                  </td>
                  <td className="flex items-center justify-center px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                    <Link
                      className="btn-outline-primary btn-sm inline-block"
                      to={`/test`}
                    >
                      <span>EXPLANATION</span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Results;
