import React from "react";

export default function NavbarVertical() {
  return (
    <div className="navbar navbarVertical">
      <nav>
        <ul>
          <li>
            <a href="#">
              <img src="/icons/icon_sport_meditation.svg" alt="icône méditation" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/icons/icon_sport_swimming.svg" alt="icône natation" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/icons/icon_sport_cycling.svg" alt="icône cyclisme" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="/icons/icon_sport_weightlifting.svg" alt="icône musculation" />
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
