import React from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../Routes/constants";
import { AiOutlineHome } from "react-icons/ai";
import ProgressBar from "../../components/ProgressBar";
import { Bar, BarChart, Cell, Pie, PieChart, Tooltip } from "recharts";
import { GiPlainCircle, GiCancel } from "react-icons/gi";
import { FcBookmark } from "react-icons/fc";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTestResults } from "../../features/testResults/testResultsSlice";

const Results = () => {
  const { testResults } = useSelector(({ testResults }) => testResults);
  const dispatch = useDispatch();

  const data = [
    { name: "Correct", value: testResults.correct_answer_interest },
    { name: "Incorrect", value: testResults.worning_interest },
  ];

  const comparison = [
    {
      name: "Your accuracy",
      value: testResults.your_accuracy,
    },
    {
      name: "Peer accuracy",
      value: testResults.peers_accuracy,
    },
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

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("testID"));
    console.log(id);
    dispatch(getTestResults(id));
  }, [dispatch]);

  return (
    <div className="bg-[#f5f5f5] pb-10">
      <nav className="bg-white shadow-md flex items-center px-5 py-4">
        <Link to={ROUTES.MAIN}>
          <AiOutlineHome size="20" className="mt-0.5" />
        </Link>

        <h1 className="ml-5 text-xl">Test Results</h1>
      </nav>

      <section className="card w-8/12 mt-10 mx-auto">
        <div className="mt-10">
          <h1 className="text-xl font-semibold text-gray-600">
            Date: {testResults.end_date}
          </h1>
          <h1 className=" text-gray-500">ID: {testResults.id}</h1>
          <h1 className="text-lg font-medium text-gray-600">
            {testResults.correct_answer_count +
              testResults.worning_answer_count}
            /{testResults.test_count} answered,{" "}
            {testResults.correct_answer_count} correct
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
                    <span>
                      {" "}
                      Correct: {testResults.correct_answer_interest}% (
                      {testResults.correct_answer_count})
                    </span>
                  </li>
                  <li className="flex items-center gap-3 mt-2">
                    <GiPlainCircle className="mt-1 text-yellow" size="20" />
                    <span>
                      {" "}
                      Incorrect: {testResults.worning_interest}% (
                      {testResults.correct_answer_count})
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-10 w-1/2">
              <BarChart width={150} height={180} data={comparison}>
                <Bar dataKey="value">
                  {comparison.map((entry, index) => (
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
                    <span>Your accuracy: {testResults.your_accuracy}</span>
                  </li>
                  <li className="flex items-center gap-3 mt-2">
                    <GiPlainCircle className="mt-1 text-yellow" size="20" />
                    <span>Peers accuracy: {testResults.peers_accuracy}</span>
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
                  Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Answered
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Completion
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Correct
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Accuracy
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testResults.isFilled &&
                testResults.test_results.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.modul_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.answer}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {item.conpletion}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {item.correct}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {item.accuracy}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {!testResults.isFilled && <p className="text-center mt-5">No data</p>}
        </div>
        <div className="mt-20">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Result
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Marked
                </th>
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
                  Subjects
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
              {testResults.isFilled &&
                testResults.worning_answers.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
                      <GiCancel className="text-danger" />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      {item.mark && <FcBookmark />}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      {item.modul_name}
                    </td>
                    <td className="flex items-center justify-center px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <Link
                        className="btn-outline-primary btn-sm inline-block"
                        to={`${ROUTES.EXPLANATION}/${item.id}`}
                      >
                        <span>EXPLANATION</span>
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {!testResults.isFilled && <p className="text-center my-5">No data</p>}
        </div>
      </section>
    </div>
  );
};

export default Results;
