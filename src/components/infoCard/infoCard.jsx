// import React, { useEffect, useState } from "react";
// import { StoreContext } from "../../providers/store";
// // import { getNutritionElementData } from "../../services/dataManager";

// /**
// //  * @param {String} type nutrition element
//  */
// export default function InfoCard({ type }) {
//   const [data] = React.useContext(StoreContext);
//   // const element = data?.nutritionElements?.find((element) => element.type === type);
//   // console.log("data", data);
//   // const [element, setElement] = useState({});

//   // useEffect(() => {
//   //   if (!data.nutritionElements) return;
//   //   // setElement(
//   //   //   data.nutritionElements?.find((element) => element.type === type)
//   //   // );
//   // }, [data]);
//   // const element = data?.nutritionElements?.find((element) => element.type === type);
//   // console.log("element", element);
//   const icon = "/icons/icon_" + type + ".svg";

//   return (
//     <article className="infoCard">
//       <img src={icon} className={type} />
//       {/* <h2>
//         {element?.value}
//         {element?.unit}
//       </h2>
//       <p>{element?.label}</p> */}
//     </article>
//   );
// }
