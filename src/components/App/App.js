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
import { api } from "../../utils/MoviesApi";


function App() {
  const [movies, setMovies] = useState([]);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [savedMovies, setSavedMovies] = useState([])
  const history = useNavigate()

  useEffect(() => {
    mainApi
      .checkTokenValidity()
      .then((data) => {
        setLoggedIn(true)
        setCurrentUser(data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [isLoggedIn])

  useEffect(() => {
    if (isLoggedIn && currentUser) {
      mainApi
        .getSavedMovies()
        .then(data => {
          const moviesList = data.filter(m => m.owner === currentUser._id)
          setSavedMovies(moviesList)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [currentUser, isLoggedIn])


  useEffect(() => {
    api.getMovies().then((inittialMovies) => {
      setMovies(inittialMovies)
    }).catch((err) => {
      console.log(err)
    })
  }, [])


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
        history("/signin");
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

  const handleDeleteMovie = (movie) => {
    const savedMovie = savedMovies.find((item) => item.movieId === movie.id || item.movieId === movie.movieId)
    mainApi
      .deleteMovie(savedMovie._id)
      .then(() => {
        setSavedMovies((state) => state.filter((item) => item._id !== savedMovie._id))
      })
      .catch((err) => {
        console.log(err)
      });
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
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SearchForm />
                  <MoviesCardList isSavedMovies={false} movies={movies}
                    onMovieLike={handleSaveMovie}
                    onMovieDelete={handleDeleteMovie} />
                  {/* <Preloader /> */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SearchForm />
                  <MoviesCardList isSavedMovies={true} movies={savedMovies} />
                </ProtectedRoute>
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
