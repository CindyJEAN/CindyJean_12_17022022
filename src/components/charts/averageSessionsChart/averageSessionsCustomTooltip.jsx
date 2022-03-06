import React from "react";

export default function AverageSessionsCustomTooltip(props) {
  const { active, payload } = props;

  if (active && payload && payload.length) {
    return (
      <div className="customTooltip">
        <p className="tooltipText">
          {payload[0].payload.sessionLength}{" "}{payload[0].unit}
        </p>
      </div>
    );
  }
  return null;
}
