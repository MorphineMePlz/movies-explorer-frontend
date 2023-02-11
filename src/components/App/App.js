import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import MainPage from "../MainPage/MainPage";
import PageWrapper from "../PageWrapper/PageWrapper";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Profile from "../Profile/Profile";
import Authorization from "../Authorization/Authorization";
import NotFound from "../NotFound/NotFound";

// import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { NAVIGATION_DELAY } from "../../utils/utils";
import { mainApi } from "../../utils/MainApi";


function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const history = useNavigate()

  useEffect(() => {
    mainApi
      .checkTokenValidity()
      .then((data) => {
        if (data) {
          setLoggedIn(true)
          setCurrentUser(data)
        }
      })
      .catch((err) => {
        console.log("checkToken", err)
      })
  }, [isLoggedIn])

  const handleRegestration = ({ name, email, password }) => {
    mainApi
      .signUp({ name, email, password })
      .then((res) => {
        if (res.statusCode !== 400) {
          setTimeout(() => {
            history("/signin");
          }, NAVIGATION_DELAY);
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const handleLogin = ({ email, password }) => {
    mainApi
      .signIn({ email, password })
      .then(() => {
        setLoggedIn(true);
        history('/movies')
      })
      .catch((err) => {
        console.log(err)
      });
  };

  const handleLogout = () => {
    mainApi
      .logout()
      .then(() => {
        setLoggedIn(false);
        history("/signin");
      }).catch((err) => {
        console.log(err)
      })
  };

  const handleUpdateUser = ({ name, email }) => {
    mainApi
      .editUserInformation(name, email)
      .then(newUserData => {
        setCurrentUser(newUserData);
      })
      .catch((err) => {
        console.log(err)
      })
  }
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <PageWrapper
          isLoggedIn={isLoggedIn}
          handleLogin={() => setLoggedIn(true)}
          handleLogout={handleLogout}
        >
          <Routes>
            <Route
              path="/signup"
              element={
                <Authorization
                  onSubmit={handleRegestration}
                  isLogin={false}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Authorization
                  isLogin={true}
                  onSubmit={handleLogin}
                />
              }
            />
            <Route exact={true} path="/" element={<MainPage />} />
            <Route
              path="/movies"
              element={
                <>
                  <SearchForm />
                  <MoviesCardList isSavedMovies={false} />
                  {/* <Preloader /> */}
                </>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <>
                  <SearchForm />
                  <MoviesCardList isSavedMovies={true} />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile handleLogout={handleLogout} handleUpdateUser={handleUpdateUser} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageWrapper>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
