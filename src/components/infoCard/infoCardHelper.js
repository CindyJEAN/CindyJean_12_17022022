import calorie from "../../assets/icons/icon_calorie.svg";
import carbohydrate from "../../assets/icons/icon_carbohydrate.svg";
import lipid from "../../assets/icons/icon_lipid.svg";
import protein from "../../assets/icons/icon_protein.svg";

export const getIcon = (type) => {
  return type === "calorie"
    ? calorie
    : type === "carbohydrate"
    ? carbohydrate
    : type === "lipid"
    ? lipid
    : protein;
};
