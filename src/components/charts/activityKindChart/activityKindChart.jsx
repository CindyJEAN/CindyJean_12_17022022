import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import React, { useEffect } from "react";
import { StoreContext } from "../../../providers/Store";
import { getUserPerformance } from "../../../services/dataManager";
import { red } from "../chartsTheme";

export default function activityKindChart() {
  const [data] = React.useContext(StoreContext);

  useEffect(() => {
    getUserPerformance();
  }, []);

  return (
    <div className="activityKindChartComponent">
      <ResponsiveContainer width="99%">
        <RadarChart outerRadius={75} data={data.performance}>
          <PolarGrid />
          <PolarAngleAxis dataKey="kind" offset={15} />
          <Radar
            name="activité"
            dataKey="value"
            stroke={red}
            fill={red}
            fillOpacity={0.8}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
