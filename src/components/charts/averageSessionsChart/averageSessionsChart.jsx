import React, { Fragment } from "react";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import { getUserAverageSessions, getUserId } from "../../../data/dataManager";

export const AverageSessionsChart = () => {
  const userId = getUserId();
  const averageSessions = getUserAverageSessions(userId);
  console.log(averageSessions);

  return (
    <div className="averageSessionsChartComponent">
      <ResponsiveContainer width="99%">
        <LineChart
          width={730}
          height={250}
          data={averageSessions}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <XAxis dataKey="day" />
          <Tooltip />
          <Line type="monotone" dataKey={"sessionLength"} stroke="#fff" dot={false}/>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
