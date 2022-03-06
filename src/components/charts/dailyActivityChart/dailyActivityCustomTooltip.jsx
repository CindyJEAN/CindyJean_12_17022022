import React from "react";

export default function DailyActivityCustomTooltip(props) {
  const { active, payload, unitLeft, unitRight } = props;

  if (active && payload && payload.length) {
    return (
      <div className="customTooltip">
        <p className="tooltipText">
          {payload[0].payload.kilogram}
          {unitRight}
        </p>
        <p className="tooltipText">
          {payload[0].payload.calories}
          {unitLeft}
        </p>
      </div>
    );
  }
  return null;
}
