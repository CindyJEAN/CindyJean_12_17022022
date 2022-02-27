import { getUserId, getUserMainDataById } from "../../data/dataManager";
import InfoCard from "../infoCard/infoCard";
import React from "react";

export default function Dashboard() {
  const userId = getUserId();
  const userMainData = getUserMainDataById(userId);
  const name = userMainData.userInfos.firstName;

  const nutritionElements = ["calorie", "protein", "carbohydrate", "lipid"];

  return (
    <main className="dashboardPage">
      <h1>
        Bonjour <span className="contrastText">{name}</span>
      </h1>
      <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>

      <div className="dashboardData">
        <div className="dashboardDataGraphs"></div>

        <div className="dashboardDataInfoCards">
          {nutritionElements.map((element, index) => (
            <InfoCard
              key={index}
              type={element}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
