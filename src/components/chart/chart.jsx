import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  {
    day: "01",
    kilogram: 80,
    calories: 240,
  },
  {
    day: "02",
    kilogram: 80,
    calories: 220,
  },
  {
    day: "03",
    kilogram: 81,
    calories: 280,
  },
  {
    day: "04",
    kilogram: 81,
    calories: 290,
  },
  {
    day: "05",
    kilogram: 80,
    calories: 160,
  },
  {
    day: "06",
    kilogram: 78,
    calories: 162,
  },
  {
    day: "07",
    kilogram: 76,
    calories: 390,
  },
];

const formatedData = [];
data.forEach((dataObj) => {
  formatedData.push({
    day: dataObj.day,
    kilogram: dataObj.kilogram,
    // calories: dataObj.calories / 5,
    calories: dataObj.calories,
    //TODO format calories to be proportionnaly smaller and stay into chart size ?
  });
});

export const Chart = () => {
  console.log("");
  return (
    <div>
      <p>chart test with ReCharts</p>
      <BarChart width={750} height={200} data={formatedData}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} />
        <XAxis dataKey="day" tickLine={false} />
        <YAxis
          dataKey="kilogram"
          orientation="right"
          axisLine={false}
          tickLine={false}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="kilogram"
          fill="#8884d8"
          barSize={7}
          radius={[10, 10, 0, 0]}
          name="Poids (kg)"
        />
        <Bar
          dataKey="calories"
          fill="#82ca9d"
          barSize={7}
          radius={[10, 10, 0, 0]}
          name="Calories brûlées (kCal)"
        />
      </BarChart>
    </div>
  );
};
