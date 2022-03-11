const {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} = require("./data");

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
 * format data for nutrition element for user
 * US #10
 *
 * @param   {String}  element  nutrition element
 *
 * @return  {Object}           label, unit and value of element
 */
const getNutritionElementDataByUserId = (element) => {
  const mainData = USER_MAIN_DATA.filter((user) => user.id === userId)[0]
    .keyData;
  const formatedData = {};

  switch (element) {
    case "calorie":
      formatedData.label = "Calories";
      formatedData.unit = "kCal";
      formatedData.value = mainData.calorieCount;
      break;
    case "protein":
      formatedData.label = "Protéines";
      formatedData.unit = "g";
      formatedData.value = mainData.proteinCount;
      break;
    case "carbohydrate":
      formatedData.label = "Glucides";
      formatedData.unit = "g";
      formatedData.value = mainData.carbohydrateCount;
      break;
    case "lipid":
      formatedData.label = "Lipides";
      formatedData.unit = "g";
      formatedData.value = mainData.lipidCount;
      break;
  }
  return formatedData;
};

/**
 * retrieve the main user info (first name, last name, today score)
 * US #5
 */
const getUserMainDataById = () => {
  return USER_MAIN_DATA.filter((user) => user.id === userId)[0];
};

/**
 * get user goal completion score
 * US #8
 *
 * @return  {Object}  score
 */
const getUserScoreById = () => {
  const score = getUserMainDataById().todayScore * 100;

  return { value: score };
};

// /**
//  * @param {number} id
//  */
// const getUserActivityById = (id) =>
//   USER_ACTIVITY.filter((userActivity) => userActivity.userId === id).shift();

/**
 * get daily user activity sessions
 * US #6
 *
 * @return  {Object}      array of objects (day, kilogram and calories), units for left YAxis and right YAxis
 */
const getUserDailyActivityById = () => {
  const userActivity = USER_ACTIVITY.filter(
    (user) => user.userId === userId
  )[0];
  const dailyActivity = userActivity.sessions.map((session) => {
    return {
      ...session,
      day: session.day.split("-")[2],
    };
  });

  return {
    dailyActivity,
    unitLeft: "kCal",
    unitRight: "kg",
  };
};

// /**
//  * @param {number} id
//  */
// const getUserAverageSession = (id) =>
//   USER_AVERAGE_SESSIONS.filter(
//     (userActivity) => userActivity.userId === id
//   ).shift();

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
  // getUserId,
  getUserMainDataById,
  getNutritionElementDataByUserId,
  // getUserActivityById,
  getUserAverageSessions,
  getUserPerformance,
  getUserDailyActivityById,
  getUserScoreById,
};
