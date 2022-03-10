import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";
import React from "react";
import { getUserPerformance } from "../../../data/dataManager";

export default function activityKindChart() {
  const performanceData = getUserPerformance();
  console.log("performanceData", performanceData);

  return (
    <div className="activityKindChartComponent">
      <ResponsiveContainer width="99%">
        <RadarChart
          outerRadius={90}
          data={performanceData}
        >
          <PolarGrid />
          <PolarAngleAxis dataKey="kind"/>
          <Radar
            name="activité"
            dataKey="value"
            stroke="#E60000"
            fill="#E60000"
            fillOpacity={0.8}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
