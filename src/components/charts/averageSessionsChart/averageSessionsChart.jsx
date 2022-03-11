import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import AverageSessionsCustomActiveDot from "./averageSessionsCustomActiveDot";
import AverageSessionsCustomTooltip from "./averageSessionsCustomTooltip";
import React from "react";
import { getUserAverageSessions } from "../../../data/dataManager";

export default function AverageSessionsChart() {
  const averageSessions = getUserAverageSessions();

  return (
    <div className="averageSessionsChartComponent">
      <h2 className="chartTitle">Durée moyenne des sessions</h2>
      <ResponsiveContainer width="99%" >
        <LineChart
          data={averageSessions}
          margin={{ top: 50, right: 20, left: 20, bottom: 0 }}
          // margin={{ right: -5, left: -5 }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="sessionLength"
            hide={true}
            domain={["dataMin-20", "dataMax+10"]}
          />
          <Tooltip content={<AverageSessionsCustomTooltip />} />
          <Line
            type="natural"
            dataKey="sessionLength"
            unit="min"
            stroke="#fff"
            strokeWidth={2}
            dot={false}
            activeDot={<AverageSessionsCustomActiveDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
