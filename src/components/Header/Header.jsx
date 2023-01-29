import React from 'react'
import { Link } from 'react-router-dom'
import headerLogo from '../../assets/images/headerLogo.svg'
import './Header.css'

export default function Header({ isLoggedIn }) {
    console.log("isLoggedIn", isLoggedIn)

    return (
        <>
            <header className='header'>
                <Link to='/'>
                    <img className='header__logo' src={headerLogo} alt='логотип'></img>
                </Link>
                <nav className='header__menu'>
                    <Link className='header__register animation-link' to='/signup'>Регистрация</Link>
                    <Link className='header__login animation-btn' to='/signin'>Войти</Link>
                </nav>
            </header>

        </>
    )
}
