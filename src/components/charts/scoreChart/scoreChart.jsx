import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import React from "react";
import { StoreContext } from "../../../providers/store";
import { redLight } from "../chartsTheme";

export default function ScoreChart() {
  const [data] = React.useContext(StoreContext);
  const background = [{ name: "background", value: 100 }];

  return (
    <div className="scoreChartComponent">
      {/* First RadialBarChart is to have a white background in the inner side of the chart */}
      <ResponsiveContainer width="99%">
        <RadialBarChart
          innerRadius="30%"
          outerRadius="100%"
          data={background}
          startAngle={220}
          endAngle={-140}
          barSize={200}
        >
          <PolarAngleAxis
            dataKey="value"
            domain={[0, 100]}
            type="number"
            tick={false}
          />
          <RadialBar
            name="background"
            dataKey="value"
            stroke={"#fff"}
            fill={"#fff"}
            cornerRadius={10}
            isAnimationActive={false}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="99%">
        <RadialBarChart
          innerRadius="65%"
          outerRadius="100%"
          data={data.score}
          startAngle={220}
          endAngle={-140}
          barSize={10}
        >
          <text
            x={25}
            y={30}
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
