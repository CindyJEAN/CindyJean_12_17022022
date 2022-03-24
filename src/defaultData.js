export default {
  id: 0,
  userInfos: {
    firstName: "",
    lastName: "",
    age: 0,
  },
  score: [{ name: "score", value: 0 }],
  nutritionElements: [
    {
      type: "calorie",
      label: "",
      unit: "",
      value: 0,
    },
    {
      type: "protein",
      label: "",
      unit: "",
      value: 0,
    },
    {
      type: "carbohydrate",
      label: "",
      unit: "",
      value: 0,
    },
    {
      type: "lipid",
      label: "",
      unit: "",
      value: 0,
    },
  ],
  dailyActivity: {
    unitLeft: "kCal",
    unitRight: "kg",
    activity: [
      {
        day: "0",
        kilogram: 0,
        calories: 0,
      },
    ],
  },
  averageSessions: [
    {
      day: "L",
      sessionLength: 30,
    },
  ],
  performance: [
    {
      value: 0,
      kind: "cardio",
    },
    {
      value: 0,
      kind: "energy",
    },
    {
      value: 0,
      kind: "endurance",
    },
    {
      value: 0,
      kind: "strength",
    },
    {
      value: 0,
      kind: "speed",
    },
    {
      value: 0,
      kind: "intensity",
    },
  ],
};
