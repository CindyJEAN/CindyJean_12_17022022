const {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} = require("./data");

// const { useFetch } = require("./useFetch");
import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState({});

  const [isLoading, setLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    if (!url) return;

    setLoading(true);

    async function fetchData() {
      try {
        const response = await fetch(server+url);

        const data = await response.json();

        setData(data);
      } catch (err) {
        console.log(err);

        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [url]);

  return { isLoading, data, error };
}

//TODO const url/endpoints : array of objects with 4 endpoints : name and url, used to call useFetch in functions.
//TODO check return comment of functions in components to see if return is named

/**
 * translated terms
 *
 * @var {Object}
 */
const translate = {
  cardio: "cardio",
  energy: "énergie",
  endurance: "endurance",
  strength: "force",
  speed: "vitesse",
  intensity: "intensité",
};

//----- userId
/**
 * get user id from url
 *
 * @return  {Number}  user id
 */
const getUserId = () => {
  const user = window.location.href.split("/")[4];
  return user === "" || user === undefined ? 12 : Number(user);
};

const userId = getUserId();

const server = "http://localhost:3000/user/"+userId;
//----- end

/**
 * retrieve the main user info (first name, last name, today score)
 * US #5
 * @return {Object} data
 */
const getUserMainDataById = () => {
  const url = `http://localhost:3000/user/${userId}`;
  const { data } = useFetch(url);
  return data;
};

//----- functions using getUserMainDataById
/**
 * format data for nutrition element for user
 * US #10
 *
 * @param   {String}  element  nutrition element
 *
 * @return  {Object}         formatedData: label, unit and value of element
 */
const getNutritionElementDataByUserId = (element) => {
  const { data } = getUserMainDataById();
  const keyData = data?.keydata;
  // const { keyData } = data;
  console.log("keyData", keyData);
  const formatedData = {};

  switch (element) {
    case "calorie":
      formatedData.label = "Calories";
      formatedData.unit = "kCal";
      formatedData.value = keyData.calorieCount;
      break;
    case "protein":
      formatedData.label = "Protéines";
      formatedData.unit = "g";
      formatedData.value = keyData.proteinCount;
      break;
    case "carbohydrate":
      formatedData.label = "Glucides";
      formatedData.unit = "g";
      formatedData.value = keyData.carbohydrateCount;
      break;
    case "lipid":
      formatedData.label = "Lipides";
      formatedData.unit = "g";
      formatedData.value = keyData.lipidCount;
      break;
  }
  return formatedData;
};

/**
 * get user goal completion score
 * US #8
 *
 * @return  {Object}  score
 */
const getUserScoreById = () => {
  const score = getUserMainDataById().todayScore * 100;

  return { name: "score", value: score };
};
//----- end

/**
 * get daily user activity sessions
 * US #6
 *
 * @return  {Object}      array of objects (day, kilogram and calories), units for left YAxis and right YAxis
 */
const getUserDailyActivityById = () => {
  const { isLoading, data, error } = useFetch("/activity");
  if ((isLoading && Object.keys(data).length ===0) || error) return { isLoading, data, error};

  // const userActivity = USER_ACTIVITY.filter(
  //   (user) => user.userId === userId
  // )[0];

  return { isLoading, data : formatDailyActivity(data.data), error };
};

function formatDailyActivity(data){
  console.log(data);
  const dailyActivity = data.sessions.map((session) => {
    return {
      ...session,
      day: session.day.split("-")[2],
    };
  });
  return   {
    dailyActivity,
    unitLeft: "kCal",
    unitRight: "kg",
  };
}

/**
 * get formated average sessions
 * US #7
 * @return  {Array<Object>}  array of objects : day (in week), sessionLength
 */
const getUserAverageSessions = () => {
  const sessions = USER_AVERAGE_SESSIONS.filter(
    (userActivity) => userActivity.userId === userId
  )[0].sessions;

  const days = ["L", "M", "M", "J", "V", "S", "D"];

  const formatedSessions = sessions.map((session) => {
    const index = sessions.indexOf(session);
    let dayIndex = index;

    while (dayIndex > 6) {
      dayIndex = dayIndex - 6;
    }

    return {
      ...session,
      day: days[dayIndex],
    };
  });
  return formatedSessions;
};

/**
 * get user activity kind performance
 * US #9
 * @return {Array<Object>} array of objects (kind of activity, value)
 */
const getUserPerformance = () => {
  const performanceData = USER_PERFORMANCE.filter(
    (userPerformance) => userPerformance.userId === userId
  )[0];

  const userPerformance = [];
  for (let i = performanceData.data.length; i > 0; i--) {
    userPerformance.push({
      value: performanceData.data[i - 1].value,
      kind: translate[performanceData.kind[i]],
    });
  }
  return userPerformance;
};

module.exports = {
  getUserMainDataById,
  getNutritionElementDataByUserId,
  getUserAverageSessions,
  getUserPerformance,
  getUserDailyActivityById,
  getUserScoreById,
};
