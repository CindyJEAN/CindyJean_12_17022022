const { store } = require("../providers/store");
const { fetcher } = require("./fetcher");

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
//----- end

/**
 * data loaded from API
 *
 * @var {Array}
 */
let fromApi = [];

/**
 * update fromApi's values if needed, update name in store and launch automatically rendering
 *
 * @return  {Promise.<void>}
 */
async function getData() {
  if (fromApi.length === 0)
    fromApi = await fetcher(`http://localhost:3000/user/${userId}`);
  store.set({
    name: fromApi[store.get].name,
  });
}

/**
 * retrieve the main user info (first name)
 * US #5
 */
async function getUserMainData() {
  if (fromApi.length === 0)
    fromApi = await fetcher(`http://localhost:3000/user/${userId}`);
  store.set({
    name: fromApi[store.get].userInfos.firstName,
  });
}

// /**
//  * get nutrition element data for user
//  * US #10
//  *
//  * @param   {String}  element  nutrition element
//  *
//  */
// async function getNutritionElementData(element) {
//   if (fromApi.length === 0)
//     fromApi = await fetcher(`http://localhost:3000/user/${userId}`);
//   const keyData = fromApi.data.keyData;
//   store.set({
//     nutritionElements: [formatNutritionElementData(element, keyData)],
//   });
// }

/**
 * get all nutrition elements data for user
 * US #10
 *
 * @param   {Array.<String>}  elements  nutrition elements
 *
 */
async function getNutritionElementsData(elements) {
  if (fromApi.length === 0)
    fromApi = await fetcher(`http://localhost:3000/user/${userId}`);
  const keyData = fromApi[store.get].keyData;

  const nutritionElements = [];
  elements.forEach((element) => {
    nutritionElements.push(formatNutritionElementData(element, keyData));
  });
  store.set({
    nutritionElements,
  });
}

/**
 * format data for nutrition element for user
 * US #10
 *
 * @param   {String}  element  nutrition element
 *
 * @return  {Object}         formatedData: label, unit and value of element
 */
const formatNutritionElementData = (element, keyData) => {
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
  formatedData.type = element;

  return formatedData;
};

/**
 * get user goal completion score
 * US #8
 */
async function getUserScore() {
  const todayScore = store.get.score * 100;
  store.set({
    score: formatUserScore(todayScore),
  });
}

/**
 * format score for graph
 * US #8
 *
 * @return  {Array.<Object>}  score object : {name, value in percent}
 */
function formatUserScore(score) {
  return [{ name: "score", value: score * 100 }];
}

/**
 * get daily user activity sessions
 * US #6
 */
async function getUserDailyActivity() {
  if (fromApi.length === 0)
    fromApi = await fetcher(`http://localhost:3000/user/${userId}/activity`);
  store.set({
    dailyActivity: formatDailyActivity(fromApi[store.get].sessions),
  });
}

/**
 * format daily user activity sessions
 * US #6
 *
 * @return  {Object}      array of objects (day, kilogram and calories), units for left YAxis and right YAxis
 */
function formatDailyActivity(data) {
  const activity = data.map((session) => {
    return {
      ...session,
      day: session.day.split("-")[2],
    };
  });
  return {
    activity,
    unitLeft: "kCal",
    unitRight: "kg",
  };
}

/**
 * get average sessions
 * US #7
 */
async function getUserAverageSessions() {
  if (fromApi.length === 0)
    fromApi = await fetcher(
      `http://localhost:3000/user/${userId}/average-sessions`
    );
  store.set({
    averageSessions: formatAverageSessions(fromApi[store.get].sessions),
  });
}

/**
 * format average sessions
 * US #7
 * @return  {Array<Object>}  array of objects : day (in week), sessionLength
 */
function formatAverageSessions(sessions) {
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
}

/**
 * get user activity kind performance
 * US #9
 */
async function getUserPerformance() {
  if (fromApi.length === 0)
    fromApi = await fetcher(`http://localhost:3000/user/${userId}/performance`);
  store.set({
    performance: formatUserPerformance(fromApi[store.get]),
  });
}

/**
 * format user activity kind performance
 * US #9
 * @return {Array<Object>} array of objects (kind of activity, value)
 */
function formatUserPerformance(performanceData) {
  const userPerformance = [];
  for (let i = performanceData.data.length; i > 0; i--) {
    userPerformance.push({
      value: performanceData.data[i - 1].value,
      kind: translate[performanceData.kind[i]],
    });
  }
  return userPerformance;
}

module.exports = {
  getData,
  getUserMainData,
  // getNutritionElementData,
  getNutritionElementsData,
  getUserAverageSessions,
  getUserPerformance,
  getUserDailyActivity,
  getUserScore,
};
