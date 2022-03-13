import {
  Legend,
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import { dark, redLight } from "../chartsTheme";
import React from "react";
import { getUserScoreById } from "../../../data/dataManager";

export default function ScoreChart() {
  // const score = [{name: "score", value: 88}];
  const score = [getUserScoreById()];

  return (
    <div className="scoreChartComponent">
      <ResponsiveContainer width="99%">
        <RadialBarChart
          innerRadius="80%"
          outerRadius="100%"
          data={score}
          startAngle={220}
          endAngle={-140}
          barSize={10}
        >
          <text
            x={0}
            y={10}
            textAnchor="left"
            dominantBaseline="central"
            className="chartTitle"
          >
            <tspan>Score</tspan>
          </text>
          <PolarAngleAxis
            dataKey="value"
            domain={[0, 100]}
            type="number"
            tick={false}
          />
          <RadialBar
            name="score"
            dataKey="value"
            stroke={redLight}
            fill={redLight}
            cornerRadius={10}
            // minAngle={30}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="scoreInfo">
        <p>{score[0].value}%</p>
        <p>de votre objectif</p>
      </div>
    </div>
  );
}
