import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, { Fragment } from "react";
import { getUserDailyActivityById, getUserId } from "../../../data/dataManager";

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div>
//         <span className="tooltipText">{payload[0].value}kg</span>
//         <span className="tooltipText">{payload[1].value}kCal</span>
//       </div>
//     );
//   }
// };

export const DailyActivityChart = () => {
  const userId = getUserId();
  const dailyActivity = getUserDailyActivityById(userId);
  // const {dailyActivity, unitLeft, untiRight} = getUserDailyActivityById(userId);

  return (
    <div className="dailyActivityChartComponent">
      <ResponsiveContainer width="99%" aspect={3}>
        <BarChart data={dailyActivity} barGap={8}>
          <text
            x={0}
            y={10}
            textAnchor="left"
            dominantBaseline="hanging"
            className="chartTitle"
          >
            <tspan>Activité quotidienne</tspan>
          </text>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="day"
            tickLine={false}
            tick={{ transform: "translate(0, 15)" }}
          />
          <YAxis
            yAxisId="kg"
            dataKey="kilogram"
            domain={["dataMin-5", "dataMax"]}
            orientation="right"
            axisLine={false}
            tickLine={false}
            tick={{ transform: "translate(20, 0)" }}
          />
          <YAxis
            yAxisId="calories"
            dataKey="calories"
            // domain={["auto", "auto"]}
            // orientation="right"
            axisLine={false}
            tickLine={false}
            // tick={{ transform: "translate(20, 0)" }}
          />
          <Tooltip
            offset={60}
            formatter={(value, name) => (
              <span className="tooltipText">{`${value}${
                name === "kg" ? "kg" : "kCal"
              }`}</span>
            )}
            labelFormatter={() => ""}
            // wrapperStyle={{ backgroundColor: "#E60000" }}
          />
          {/* <Tooltip offset={60} /> */}
          {/* <Tooltip offset={60} content={<CustomTooltip />} /> */}
          {/* <Tooltip offset={60} formatter={(value) => <span className="tooltipText">{value}</span>}/> */}
          <Legend
            align="right"
            verticalAlign="top"
            height={60}
            iconType="circle"
            formatter={(value) => (
              <span className="barChartLegend">{value}</span>
            )}
          />
          <Bar
            dataKey="kilogram"
            fill="#282D30"
            barSize={7}
            radius={[10, 10, 0, 0]}
            // name="kg"
            name="Poids (kg)"
            yAxisId="kg"
          />
          <Bar
            yAxisId="calories"
            dataKey="calories"
            fill="#E60000"
            barSize={7}
            radius={[10, 10, 0, 0]}
            // name="kCal"
            name="Calories brûlées (kCal)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
