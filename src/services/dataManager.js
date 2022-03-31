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

/**
 * get the main user info and store the userInfos, score and nutrition elements' info
 * US #4
 * US #5
 */
async function getUserMainData() {
  const fromApi = await fetcher(`http://localhost:3000/user/${userId}`);

  fromApi.data.score = formatUserScore(fromApi.data.todayScore);
  delete fromApi.data.todayScore;

  fromApi.data.nutritionElements = getNutritionElementsData(
    fromApi.data.keyData
  );
  delete fromApi.data.keyData;

  store.set({
    ...fromApi.data,
  });
}

/**
 * get all nutrition elements data for user and format data
 * US #10
 *
 * @param   {Object}  keyData  nutrition elements info
 * @return  {Array.<Object>} nutrition elements data formated
 */
function getNutritionElementsData(keyData) {
  const nutritionElements = [];
  for (const key of Object.keys(keyData)) {
    const elementType = key.toString().slice(0, -5);
    nutritionElements.push(formatNutritionElement(elementType, keyData));
  }
  return nutritionElements;
}

/**
 * format data for nutrition element for user
 * US #10
 *
 * @param   {String}  element  nutrition element
 * @param   {Object}  keyData  nutrition elements info
 * @return  {Object}         formatedData: type, label, unit and value of element
 */
const formatNutritionElement = (element, keyData) => {
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
 * format score for graph
 * US #8
 *
 * @param {Number} score between 0 and 1
 * @return  {Array.<Object>}  score object : { name, value in percent }
 */
function formatUserScore(score) {
  return [{ name: "score", value: score * 100 }];
}

/**
 * get daily user activity sessions and store formated activity
 * US #6
 */
async function getUserDailyActivity() {
  const fromApi = await fetcher(
    `http://localhost:3000/user/${userId}/activity`
  );
  store.set({
    dailyActivity: formatDailyActivity(fromApi.data.sessions),
  });
}

/**
 * format daily user activity sessions
 * US #6
 *
 * @param {Array} data daily activity sessions
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
 * get average sessions and store them formated
 * US #7
 */
async function getUserAverageSessions() {
  const fromApi = await fetcher(
    `http://localhost:3000/user/${userId}/average-sessions`
  );
  store.set({
    averageSessions: formatAverageSessions(fromApi.data.sessions),
  });
}

/**
 * format average sessions
 * US #7
 *
 * @param {Array} sessions average sessions data
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
 * get user performance and store formated activity kinds
 * US #9
 */
async function getUserPerformance() {
  const fromApi = await fetcher(
    `http://localhost:3000/user/${userId}/performance`
  );
  store.set({
    performance: formatUserPerformance(fromApi.data),
  });
}

/**
 * format user activity kind performance
 * US #9
 *
 * @param {Object} performanceData data : { kind, data }
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
  getUserMainData,
  getUserAverageSessions,
  getUserPerformance,
  getUserDailyActivity,
};
