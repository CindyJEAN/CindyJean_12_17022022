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
  console.log("averageSessions", averageSessions);

  return (
    <div className="averageSessionsChartComponent">
      <ResponsiveContainer width="99%">
        <LineChart
          width={730}
          height={250}
          data={averageSessions}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <text
            x={0}
            y={10}
            textAnchor="left"
            dominantBaseline="hanging"
            className="chartTitle"
            // width={100}
          >
            <tspan>Durée moyenne des sessions</tspan>
          </text>
          <XAxis dataKey="day" axisLine={false} tickLine={false} />
          <YAxis
            dataKey="sessionLength"
            hide={true}
            domain={["dataMin-20", "dataMax+20"]}
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
