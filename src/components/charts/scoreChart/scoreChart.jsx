import {
  PolarAngleAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts";
import React, { useEffect } from "react";
import { StoreContext } from "../../../providers/store";
import { redLight } from "../chartsTheme";
import { getUserScore } from "../../../services/dataManager";

export default function ScoreChart() {
  // const score = [{name: "score", value: 88}];
  // const score = [getUserScoreById()];
  const [data] = React.useContext(StoreContext);

  useEffect(() => {
    getUserScore();
  }, []);

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
