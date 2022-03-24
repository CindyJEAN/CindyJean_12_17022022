import React, { useEffect } from "react";
import ActivityKindChart from "../charts/activityKindChart/activityKindChart";
import AverageSessionsChart from "../charts/averageSessionsChart/averageSessionsChart";
import DailyActivityChart from "../charts/dailyActivityChart/dailyActivityChart";
// import InfoCard from "../infoCard/infoCard";
import ScoreChart from "../charts/scoreChart/scoreChart";
import { StoreContext } from "../../providers/store";
import { getNutritionElementsData } from "../../services/dataManager";

export default function Dashboard() {
  const [data] = React.useContext(StoreContext);
  const nutritionElements = ["calorie", "protein", "carbohydrate", "lipid"];

  // useEffect(() => {
  //   getNutritionElementsData(nutritionElements);
  // }, []);

  return (
    <main className="dashboardPage">
      <h1>
        Bonjour <span className="contrastText">{data.name}</span>
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
