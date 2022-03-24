import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import { StoreContext } from "../../../providers/Store";
import { redLight } from "../chartsTheme";

export default function ScoreChart() {
  const [data] = React.useContext(StoreContext);
  console.log("data in scoreChart", data);

  return (
    <div className="scoreChartComponent">
      <ResponsiveContainer width="99%">
        <RadialBarChart
          innerRadius="80%"
          outerRadius="100%"
          data={data.score}
          startAngle={220}
          endAngle={-140}
          barSize={8}
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
        <p>{data.score[0].value}%</p>
        <p>de votre objectif</p>
      </div>
    </div>
  );
}
