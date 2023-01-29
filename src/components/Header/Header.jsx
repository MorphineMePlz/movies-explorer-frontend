import React from 'react'
import { NavLink } from 'react-router-dom'
import headerLogo from '../../assets/images/headerLogo.svg'
import './Header.css'

export default function Header({ isLoggedIn }) {
    return (
        <>
            <header className='header'>
                <NavLink to='/'>
                    <img className='header__logo' src={headerLogo} alt='логотип'></img>
                </NavLink>

                {isLoggedIn ?
                    <div className='header__nav-wrapper'>
                        <nav className='header__menu header__menu_auth'>
                            <NavLink to="/movies" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`} >Фильмы</NavLink>
                            <NavLink to="/saved-movies" className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`} >Сохраненные фильмы</NavLink>
                        </nav>

                        <NavLink to="/profile" className="header__link header__link_type_profile">Аккаунт</NavLink>
                    </div> :
                    <nav className='header__menu'>
                        <NavLink className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`} to='/signup'>Регистрация</NavLink>
                        <NavLink className="header__link header__link_type_sign-in" to='/signin'>Войти</NavLink>
                    </nav>}
            </header>

        </>
    )
}
