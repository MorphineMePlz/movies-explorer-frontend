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
  const [savedMovies, setSavedMovies] = useState([]);
  const [isUserLoaded, setUserLoaded] = useState(false);
  const history = useNavigate()

  // useEffect(() => {
  //   if (isLoggedIn) {
  //     mainApi
  //       .getUserInfo()
  //       .then((data) => {
  //         setLoggedIn(true)
  //         setCurrentUser(data)
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //       })
  //   }
  // }, [isLoggedIn])

  useEffect(() => {
    mainApi
      .checkTokenValidity()
      .then((data) => {
        setLoggedIn(true);
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err)
      }).finally(() => {
        setUserLoaded(true);
      })
  }, [isLoggedIn])


  //Рега

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

  //Вход

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

  //Выход

  const handleLogout = () => {
    mainApi
      .logout()
      .then(() => {
        setLoggedIn(false);
        history("/");
        // localStorage.removeItem(`${currentUser.email} - movies`)
        // localStorage.removeItem(`${currentUser.email} - shortMovies`)
        // localStorage.removeItem(`${currentUser.email} - moviesSearch`)
        // localStorage.removeItem(`${currentUser.email} - shortSavedMovies`)
        // localStorage.removeItem(`${currentUser.email} - allMovies`)
      }).catch((err) => {
        console.log(err)
      })
  };

  //Обновление информации о пользователе

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

  //Добавление фильма в избранные

  const handleSaveMovie = (movie) => {
    mainApi
      .createMovies(movie)
      .then((newMovie) => setSavedMovies([newMovie, ...savedMovies])
      )
      .catch((error) => {
        console.log(error);
      });
  }

  //Удаление фильма


  // console.log(movies)
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <PageWrapper
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
        >
          <Routes>
            <Route
              path="/signup"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} isLoaded={isUserLoaded}>
                  <Authorization
                    isLogin={false}
                    onSubmit={handleRegestration}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/signin"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} isLoaded={isUserLoaded}>
                  <Authorization
                    isLogin={true}
                    onSubmit={handleLogin}
                  />
                </ProtectedRoute>
              }
            />
            <Route exact={true} path="/" element={<MainPage />} />
            <Route
              path="/movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} isLoaded={isUserLoaded}>
                  <SearchForm />
                  <MoviesCardList isSavedMovies={false}
                    onMovieLike={handleSaveMovie} />
                  {/* <Preloader /> */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} isLoaded={isUserLoaded}>
                  <SearchForm />
                  <MoviesCardList isSavedMovies={true} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn} isLoaded={isUserLoaded}>
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
