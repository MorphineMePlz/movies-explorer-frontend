import React from "react";
import { NavLink } from "react-router-dom";
import headerLogo from "../../assets/images/headerLogo.svg";
import "./Header.css";

export default function Header({
  isLoggedIn,
  handleLogin,
  handleBurgerMenu,
  isBurgerMenuOpen
}) {
  const isDesktop = window.innerWidth > 768;

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={headerLogo} alt="логотип" />
      </NavLink>
      {isLoggedIn ? (
        <>
          {isDesktop ? (
            <div className="header__nav-wrapper">
              <nav className="header__menu header__menu_auth">
                <NavLink
                  to="/movies"
                  className={({ isActive }) =>
                    `header__link ${isActive ? "header__link_active" : ""}`
                  }
                >
                  Фильмы
                </NavLink>
                <NavLink
                  to="/saved-movies"
                  className={({ isActive }) =>
                    `header__link ${isActive ? "header__link_active" : ""}`
                  }
                >
                  Сохраненные фильмы
                </NavLink>
              </nav>
              <NavLink
                to="/profile"
                className="header__link header__link_type_profile"
              >
                Аккаунт
              </NavLink>
            </div>
          ) : (
            <button
              onClick={handleBurgerMenu}
              className={`header__open-button ${
                isBurgerMenuOpen ? "header__open-button_opened" : ""
              }`}
            />
          )}
        </>
      ) : (
        <nav className="header__menu">
          <NavLink
            className={({ isActive }) =>
              `header__link ${isActive ? "header__link_active" : ""}`
            }
            to="/signup"
          >
            Регистрация
          </NavLink>
          <NavLink
            className="header__link header__link_type_sign-in"
            to="/signin"
            // TODO: remove after backend is connected
            onClick={handleLogin}
          >
            Войти
          </NavLink>
        </nav>
      )}
    </header>
  );
}
