
import { NavLink } from 'react-router-dom'

import './BurgerMenu.css'

export default function BurgerMenu() {
    return (
        <div className="burger">
            <div className="burger__box">
                <button className="burger__button-close"></button>
                <div className="burger__link-box">
                    <span className='burger__links'>
                        <NavLink className={({ isActive }) => `burger__link ${isActive ? "burger__link_active" : ""}`} to='/'>Главная</NavLink>
                        <NavLink className={({ isActive }) => `burger__link ${isActive ? "burger__link_active" : ""}`} to='/movies'>Фильмы</NavLink>
                        <NavLink className={({ isActive }) => `burger__link ${isActive ? "burger__link_active" : ""}`} to='/saved-movies'>Сохраненные фильмы</NavLink>
                    </span>
                    <NavLink to="/profile" className="burger__link burger__link_type_profile">Аккаунт</NavLink>
                </div>
            </div>
            <div className="burger__overlay"></div>
        </div>
    )
}