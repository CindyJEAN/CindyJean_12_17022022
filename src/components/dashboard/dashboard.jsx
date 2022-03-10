import AverageSessionsChart from "../charts/averageSessionsChart/averageSessionsChart";
import DailyActivityChart from "../charts/dailyActivityChart/dailyActivityChart";
import InfoCard from "../infoCard/infoCard";
import React from "react";
import { getUserMainDataById } from "../../data/dataManager";
import ActivityKindChart from "../charts/activityKindChart/activityKindChart";

export default function Dashboard() {
  const userMainData = getUserMainDataById();
  const name = userMainData.userInfos.firstName;

  const nutritionElements = ["calorie", "protein", "carbohydrate", "lipid"];

  return (
    <main className="dashboardPage">
      <h1>
        Bonjour <span className="contrastText">{name}</span>
      </h1>
      <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>

      <div className="dashboardData">
        <div className="dashboardDataGraphs">
          <DailyActivityChart />
          <AverageSessionsChart />
          <ActivityKindChart />
        </div>

        <div className="dashboardDataInfoCards">
          {nutritionElements.map((element, index) => (
            <InfoCard key={index} type={element} />
          ))}
        </div>
      </div>
    </main>
  );
}
