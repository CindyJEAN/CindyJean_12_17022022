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
import React, { useEffect } from "react";
import { dark, red } from "../chartsTheme";
import DailyActivityCustomTooltip from "./dailyActivityCustomTooltip";
import { StoreContext } from "../../../providers/Store";
import { getUserDailyActivity } from "../../../services/dataManager";

export default function DailyActivityChart() {
  const [data] = React.useContext(StoreContext);

  useEffect(() => {
    getUserDailyActivity();
  }, []);

  return (
    <div className="dailyActivityChartComponent">
      <ResponsiveContainer width="99%">
        <BarChart data={data.dailyActivity.activity} barGap={8}>
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
                unitLeft={data.unitLeft}
                unitRight={data.unitRight}
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
            fill={dark}
            barSize={8}
            radius={[10, 10, 0, 0]}
            name={`Poids (${data.unitRight})`}
            yAxisId="kg"
            unit={data.unitRight}
          />
          <Bar
            yAxisId="calories"
            dataKey="calories"
            fill={red}
            barSize={8}
            radius={[10, 10, 0, 0]}
            name={`Calories brûlées (${data.unitLeft})`}
            unit={data.unitLeft}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
