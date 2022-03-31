import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import React, { useEffect } from "react";
import AverageSessionsCustomActiveDot from "./averageSessionsCustomActiveDot";
import AverageSessionsCustomTooltip from "./averageSessionsCustomTooltip";
import { StoreContext } from "../../../providers/store";
import { getUserAverageSessions } from "../../../services/dataManager";

export default function AverageSessionsChart() {
  const [data] = React.useContext(StoreContext);
  useEffect(() => {
    getUserAverageSessions();
  }, []);

  return (
    <div className="averageSessionsChartComponent">
      <h2 className="chartTitle">Durée moyenne des sessions</h2>
      <ResponsiveContainer width="99%" >
        <LineChart
          data={data.averageSessions}
          margin={{ top: 50, right: 20, left: 20, bottom: 0 }}
        >
          <XAxis
            dataKey="day"
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            dataKey="sessionLength"
            hide={true}
            domain={["dataMin-20", "dataMax+10"]}
          />
          <Tooltip content={<AverageSessionsCustomTooltip />} />
          <Line
            type="natural"
            dataKey="sessionLength"
            unit="min"
            stroke="#fff"
            strokeWidth={2}
            dot={false}
            activeDot={<AverageSessionsCustomActiveDot />}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
