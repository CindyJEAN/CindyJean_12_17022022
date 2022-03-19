import React from "react";
import { getNutritionElementDataByUserId } from "../../data/dataManager";

export default function InfoCard({ type }) {
  // getNutritionElementDataByUserId(type);
  const { formatedData } = getNutritionElementDataByUserId(type);
  // const icon = "/icons/icon_" + type + ".svg";

  return (
    <article className="infoCard">
      {/* <img src={icon} className={type} /> */}
      {/* <h2>
        {formatedData.value}
        {formatedData.unit}
      </h2>
      <p>{formatedData.label}</p> */}
    </article>
  );
}
