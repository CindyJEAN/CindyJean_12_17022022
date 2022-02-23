import React from "react";
import cycling from "../../assets/icons/icon_sport_cycling.svg";
import meditation from "../../assets/icons/icon_sport_meditation.svg";
import swimming from "../../assets/icons/icon_sport_swimming.svg";
import weightlifting from "../../assets/icons/icon_sport_weightlifting.svg";

export default function NavbarVertical() {
  return (
    <div className="navbar navbarVertical">
      <nav>
        <ul>
          <li>
            <a href="#">
              <img src={meditation} alt="logo sportsee" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={swimming} alt="logo sportsee" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={cycling} alt="logo sportsee" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src={weightlifting} alt="logo sportsee" />
            </a>
          </li>
        </ul>
      </nav>
      <div>
        <p>Copyright, SportSee 2020</p>
      </div>
    </div>
  );
}
