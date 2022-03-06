import React, { Fragment } from "react";
import { Dot } from "recharts";

export default function AverageSessionsCustomActiveDot(props) {
  const { cy, cx, fill } = props;

  return (
    <Fragment>
      <Dot r={4} cy={cy} cx={cx} fill={fill} className={"dot"} />
      <Dot r={8} cy={cy} cx={cx} fill={"rgba(255, 255, 255, 0.25)"} className={"dot"} />
    </Fragment>
  );
}