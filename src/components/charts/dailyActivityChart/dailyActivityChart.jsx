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
import DailyActivityCustomTooltip from "./dailyActivityCustomTooltip";
import React from "react";
import { getUserDailyActivityById } from "../../../data/dataManager";

export default function DailyActivityChart() {
  const { dailyActivity, unitLeft, unitRight } = getUserDailyActivityById();

  return (
    <div className="dailyActivityChartComponent">
      <ResponsiveContainer width="99%">
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
          <XAxis dataKey="day" tickLine={false} tickMargin={15} />
          <YAxis
            yAxisId="kg"
            dataKey="kilogram"
            domain={["dataMin-5", "dataMax"]}
            orientation="right"
            axisLine={false}
            tickLine={false}
            tickMargin={20}
          />
          <YAxis yAxisId="calories" dataKey="calories" hide={true} />
          <Tooltip
            offset={60}
            content={
              <DailyActivityCustomTooltip
                unitLeft={unitLeft}
                unitRight={unitRight}
              />
            }
          />
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
            barSize={8}
            radius={[10, 10, 0, 0]}
            name={`Poids (${unitRight})`}
            yAxisId="kg"
            unit={unitRight}
          />
          <Bar
            yAxisId="calories"
            dataKey="calories"
            fill="#E60000"
            barSize={8}
            radius={[10, 10, 0, 0]}
            name={`Calories brûlées (${unitLeft})`}
            unit={unitLeft}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
