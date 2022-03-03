import React from "react";
import {
  getNutritionElementDataByUserId,
} from "../../data/dataManager";

export default function InfoCard({ type }) {
  const data = getNutritionElementDataByUserId(type);
  const icon = "/icons/icon_"+type+".svg";

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
