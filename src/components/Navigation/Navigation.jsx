import React from 'react'
import { Link, useLocation } from 'react-router-dom'
// import NavTab from '../NavTab/NavTab'
import './Navigation.css'
import headerLogo from '../../assets/images/headerLogo.svg'

export default function Navigation() {
  const location = useLocation()
  return (
    <section className={location.pathname === '/' ? 'navigation navigation_red-theme' : 'navigation navigation_dark-theme'}>
    <div className='navigation__container'>
        <Link to='/' className='navigation__logo-link'>
            <img className='navigation__logo' src={headerLogo} alt='логотип'></img>
        </Link>        
        {/* <NavTab /> */}
    </div>
    </section>
  )
}