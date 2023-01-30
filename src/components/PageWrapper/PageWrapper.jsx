import { useMemo } from 'react';

import { useLocation } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';

const WRAPPER_ROUTES = ["/", "/saved-movies", "/profile", "/movies"];
const NO_FOOTER_ROUTES = ["/profile"]

export default function PageWrapper({ isLoggedIn, handleLogin, children }) {
    const location = useLocation();

    const isWrapperHidden = useMemo(() => !WRAPPER_ROUTES.includes(location.pathname), [location.pathname])
    const isFooterHidden = useMemo(() => NO_FOOTER_ROUTES.includes(location.pathname), [location.pathname]);

    return (
        <>
            {isWrapperHidden ? <>{children}</> : <>
                <Header isLoggedIn={isLoggedIn} handleLogin={handleLogin} />
                {children}
                {!isFooterHidden && <Footer />}
            </>}
        </>
    )
}