import InfoCard from "../infoCard/infoCard";
import React from "react";
import { getUserById } from "../../data/dataManager";

const userId = 12;

export default function Dashboard() {
  const userMainData = getUserById(userId);
  const name = userMainData.userInfos.firstName;

  const keyData = [];
  for (const [key, value] of Object.entries(userMainData.keyData)) {
    const label = key.toString().slice(0, -5);
    keyData.push({
      label: label,
      count: value,
      icon: `icon_${label}.svg`,
    });
  }

  return (
    <main className="dashboardPage">
      <h1>
        Bonjour <span className="contrastText">{name}</span>
      </h1>
      <p>Félicitations ! Vous avez explosé vos objectifs hier 👏</p>

      <div className="dashboardData">
        <div className="dashboardDataGraphs"></div>

        <div className="dashboardDataInfoCards">
          {keyData.map((element, index) => (
            <InfoCard
              key={index}
              label={element.label}
              value={element.count}
              icon={element.icon}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
