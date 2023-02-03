import { useMemo, useState } from "react";

import { useLocation } from "react-router-dom";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import "./PageWrapper.css";

const WRAPPER_ROUTES = ["/", "/saved-movies", "/profile", "/movies"];
const NO_FOOTER_ROUTES = ["/profile"];

export default function PageWrapper({ isLoggedIn, handleLogin, children }) {
  const [isBurgerMenuOpen, setisBurgerMenuOpen] = useState(false);

  const location = useLocation();
  const isWrapperHidden = useMemo(
    () => !WRAPPER_ROUTES.includes(location.pathname),
    [location.pathname]
  );
  const isFooterHidden = useMemo(
    () => NO_FOOTER_ROUTES.includes(location.pathname),
    [location.pathname]
  );

  const handleBurgerMenu = () => {
    setisBurgerMenuOpen(!isBurgerMenuOpen);
  };

  return (
    <>
      {isWrapperHidden ? (
        <>{children}</>
      ) : (
        <div className="page-wrapper">
          <Header
            isLoggedIn={isLoggedIn}
            handleLogin={handleLogin}
            handleBurgerMenu={handleBurgerMenu}
            isBurgerMenuOpen={isBurgerMenuOpen}
          />
          <BurgerMenu
            isBurgerMenuOpen={isBurgerMenuOpen}
            closeBurgerMenu={() => setisBurgerMenuOpen(false)}
          />
          {children}
          {!isFooterHidden && <Footer />}
        </div>
      )}
    </>
  );
}
