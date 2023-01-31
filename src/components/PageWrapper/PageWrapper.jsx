import { useMemo, useState } from 'react';

import { useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import BurgerMenu from '../BurgerMenu/BurgerMenu';
import './PageWrapper.css'

const WRAPPER_ROUTES = ["/", "/saved-movies", "/profile", "/movies"];
const NO_FOOTER_ROUTES = ["/profile"]

export default function PageWrapper({ isLoggedIn, handleLogin, children }) {
    const [isBurgerMenuOpen, setisBurgerMenuOpen] = useState(false);

    function closeBurgerMenu() {
        setisBurgerMenuOpen(false);
    }

    function openBurgerMenu() {
        setisBurgerMenuOpen(true);
    }

    const location = useLocation();
    const isWrapperHidden = useMemo(() => !WRAPPER_ROUTES.includes(location.pathname), [location.pathname])
    const isFooterHidden = useMemo(() => NO_FOOTER_ROUTES.includes(location.pathname), [location.pathname]);

    return (
        <>
            {isWrapperHidden ? <>{children}</> : <div className="page-wrapper">
                <Header isLoggedIn={isLoggedIn} handleLogin={handleLogin} openBurgerMenu={openBurgerMenu} />
                <BurgerMenu closeBurgerMenu={closeBurgerMenu} isBurgerMenuOpen={isBurgerMenuOpen} />
                {children}
                {!isFooterHidden && <Footer />}
            </div>
            }
        </>
    )
}