import ActivityKindChart from "../charts/activityKindChart/activityKindChart";
import AverageSessionsChart from "../charts/averageSessionsChart/averageSessionsChart";
import DailyActivityChart from "../charts/dailyActivityChart/dailyActivityChart";
import InfoCard from "../infoCard/infoCard";
import React from "react";
import ScoreChart from "../charts/scoreChart/scoreChart";
import { getUserMainDataById } from "../../data/dataManager";

export default function Dashboard() {
  const { data } = getUserMainDataById();
  const name = data?.userInfos.firstName;

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
          <ScoreChart />
        </div>

        {/* <div className="dashboardDataInfoCards">
          {nutritionElements.map((element, index) => (
            <InfoCard key={index} type={element} />
          ))}
        </div> */}
      </div>
    </main>
  );
}
