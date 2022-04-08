import React, { useEffect } from "react";
import ActivityKindChart from "../../components/charts/activityKindChart/activityKindChart";
import AverageSessionsChart from "../../components/charts/averageSessionsChart/averageSessionsChart";
import DailyActivityChart from "../../components/charts/dailyActivityChart/dailyActivityChart";
import ScoreChart from "../../components/charts/scoreChart/scoreChart";
import { StoreContext } from "../../providers/store";
import { getUserMainData } from "../../services/dataManager";

export default function Dashboard() {
  const [data] = React.useContext(StoreContext);
  useEffect(() => {
    getUserMainData();
  }, []);

  return (
    <main className="dashboardPage">
      <h1>
        Bonjour <span className="contrastText">{data.userInfos.firstName}</span>
      </h1>
      <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>

      <div className="dashboardData">
        <div className="dashboardDataGraphs">
          <DailyActivityChart />
          <AverageSessionsChart />
          <ActivityKindChart />
          <ScoreChart />
        </div>

        <div className="dashboardDataInfoCards">
          {data.nutritionElements.map((element) => infoCard(element))}
        </div>
      </div>
    </main>
  );
}

/**
 * gets the infoCard for the given nutrition element
 * @param {Object} element
 * @return infoCard jsx with the element's informations
 */
function infoCard(element) {
  const icon = "/icons/icon_" + element.type + ".svg";
  return (
    <article key={element.type} className="infoCard">
      <img src={icon} className={element.type} />
      <h2>
        {element.value}
        {element.unit}
      </h2>
      <p>{element.label}</p>
    </article>
  );
}
