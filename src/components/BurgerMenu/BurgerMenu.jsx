import React from "react";
import { NavLink } from "react-router-dom";

import "./BurgerMenu.css";

export default function BurgerMenu({ closeBurgerMenu, isBurgerMenuOpen }) {
  return (
    <div className={`burger ${isBurgerMenuOpen ? "burger_active" : ""}`}>
      <div className="burger__box">
        <div className="burger__link-box">
          <span className="burger__links">
            <NavLink
              className={({ isActive }) =>
                `burger__link ${isActive ? "burger__link_active" : ""}`
              }
              to="/"
              onClick={closeBurgerMenu}
            >
              Главная
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `burger__link ${isActive ? "burger__link_active" : ""}`
              }
              to="/movies"
              onClick={closeBurgerMenu}
            >
              Фильмы
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `burger__link ${isActive ? "burger__link_active" : ""}`
              }
              to="/saved-movies"
              onClick={closeBurgerMenu}
            >
              Сохраненные фильмы
            </NavLink>
          </span>
          <NavLink
            to="/profile"
            className="burger__link burger__link_type_profile"
            onClick={closeBurgerMenu}
          >
            Аккаунт
          </NavLink>
        </div>
      </div>
      <div className="burger__overlay" />
    </div>
  );
}
