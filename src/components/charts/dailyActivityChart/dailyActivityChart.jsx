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
import { StoreContext } from "../../../providers/store";
import { getUserDailyActivity } from "../../../services/dataManager";

export default function DailyActivityChart() {
  const [data] = React.useContext(StoreContext);
  const { activity, unitLeft, unitRight } = data.dailyActivity;

  useEffect(() => {
    getUserDailyActivity();
  }, []);

  return (
    <div className="dailyActivityChartComponent">
      <ResponsiveContainer width="99%">
        <BarChart data={activity} barGap={8}>
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
            domain={["dataMin-2", "dataMax+2"]}
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
            height={70}
            iconType="circle"
            iconSize={9}
            formatter={(value) => (
              <span className="barChartLegend">{value}</span>
            )}
          />
          <Bar
            dataKey="kilogram"
            fill={dark}
            barSize={8}
            radius={[10, 10, 0, 0]}
            name={`Poids (${unitRight})`}
            yAxisId="kg"
            unit={unitRight}
          />
          <Bar
            yAxisId="calories"
            dataKey="calories"
            fill={red}
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
