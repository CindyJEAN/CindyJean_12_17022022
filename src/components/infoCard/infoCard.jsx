import {
  getNutritionElementDataByUserId,
  getUserId,
} from "../../data/dataManager";
import React from "react";
import { getIcon } from "./infoCardHelper";

export default function InfoCard({ type }) {
  const userId = getUserId();
  const data = getNutritionElementDataByUserId(type, userId);

  // const getIcon = (type) => {
  //   return `../../assets/icons/icon_${type}.svg`;
  // };
  const icon = getIcon(type);

  return (
    <article className="infoCard">
      <img src={icon} className={type}/>
      <h2>
        {data.value}
        {data.unit}
      </h2>
      <p>{data.label}</p>
    </article>
  );
}
