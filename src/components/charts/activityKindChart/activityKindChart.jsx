import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import { getUserPerformance } from "../../../data/dataManager";
import { red } from "../chartsTheme";

export default function activityKindChart() {
  const performanceData = getUserPerformance();

  return (
    <div className="activityKindChartComponent">
      <ResponsiveContainer width="99%">
        <RadarChart outerRadius={75} data={performanceData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="kind" offset={15} />
          <Radar
            name="activité"
            dataKey="value"
            stroke={red}
            fill={red}
            fillOpacity={0.8}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
