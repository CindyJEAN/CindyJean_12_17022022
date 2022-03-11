import { RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";
import React from "react";
import { getUserScoreById } from "../../../data/dataManager";
import {red} from "../chartsTheme";

export default function ScoreChart() {
  const score = [getUserScoreById()];

  return (
    <div className="scoreChartComponent">
      <ResponsiveContainer width="99%">
        <RadialBarChart
          innerRadius="10%"
          outerRadius="80%"
          data={score}
          // startAngle={180}
          // endAngle={0}
          // minAngle={15}
          barSize={10}
        >
          <text
            x={0}
            y={10}
            textAnchor="left"
            dominantBaseline="central"
            className="chartTitle"
          >
            <tspan>Activité quotidienne</tspan>
          </text>
          <RadialBar
            name="score"
            dataKey="value"
            stroke={red}
            fill={red}
            label={{ fill: red, position: "insideStart" }}
          />
        </RadialBarChart>
      </ResponsiveContainer>
    </div>
  );
}
