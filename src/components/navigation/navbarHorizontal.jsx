import React from "react";
import logo from "../../assets/icons/logo_sportsee_text.svg";

export default function NavbarHorizontal() {
  return (
    <header className="navbar navbarHorizontal">
      <nav>
        <img src={logo} alt="logo sportsee"/>
        <ul>
          <li>
            <a href="#">Accueil</a>
          </li>
          <li>
            <a href="#">Profil</a>
          </li>
          <li>
            <a href="#">Réglage</a>
          </li>
          <li>
            <a href="#">Communauté</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
