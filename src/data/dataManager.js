const {
  USER_MAIN_DATA,
  USER_ACTIVITY,
  USER_AVERAGE_SESSIONS,
  USER_PERFORMANCE,
} = require("./data");

const getUserId = () => {
  const user = window.location.href.split("/")[4];
  return user === "" || user === undefined ? 12 : Number(user);
};

/**
 * format data for nutrition element for user
 * US #10
 *
 * @param   {String}  element  nutrition element
 * @param   {Number}  id       user id
 *
 * @return  {Object}           label, unit and value of element
 */
const getNutritionElementDataByUserId = (element, id) => {
  const mainData = USER_MAIN_DATA.filter((user) => user.id === id)[0].keyData;
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
 * @param {number} id
 */
const getUserMainDataById = (id) => {
  return USER_MAIN_DATA.filter((user) => user.id === id)[0];
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
 * @param   {Number}  id  user id
 *
 * @return  {Array.<Object>}      session object : day, kilogram and calories
 */
const getUserDailyActivityById = (id) => {
  const userActivity = USER_ACTIVITY.filter((user) => user.userId === id)[0];
  const dailyActivity = userActivity.sessions.map((session) => {
    return {
      ...session,
      day: session.day.split("-")[2],
    };
  });
  return dailyActivity;
};

// /**
//  * @param {number} id
//  */
// const getUserAverageSession = (id) =>
//   USER_AVERAGE_SESSIONS.filter(
//     (userActivity) => userActivity.userId === id
//   ).shift();

const getUserAverageSessions = (id) => {
  const sessions = USER_AVERAGE_SESSIONS.filter(
    (userActivity) => userActivity.userId === id
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

  const totalSessionsLength = sessions.reduce(
    (acc, curr) => acc + curr.sessionLength,
    0
  );
  const average = totalSessionsLength / sessions.length;
  return { average, formatedSessions };
};

/**
 * @param {number} id
 */
const getUserPerformance = (id) =>
  USER_PERFORMANCE.filter(
    (userPerformance) => userPerformance.userId === id
  ).shift();

module.exports = {
  getUserId,
  getUserMainDataById,
  getNutritionElementDataByUserId,
  // getUserActivityById,
  getUserAverageSessions,
  getUserPerformance,
  getUserDailyActivityById,
};
