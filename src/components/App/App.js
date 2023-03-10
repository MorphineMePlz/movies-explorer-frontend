//Это для реквеста)

import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import MainPage from "../MainPage/MainPage";
import PageWrapper from "../PageWrapper/PageWrapper";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Profile from "../Profile/Profile";
import Authorization from "../Authorization/Authorization";
import NotFound from "../NotFound/NotFound";
import LoadingPopup from '../LoadingPopup/LoadingPopup';
import InfoTooltip from "../InfoTooltip/InfoTooltip"

import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { CurrentUserContext } from "../../context/CurrentUserContext";
import { mainApi } from "../../utils/MainApi";
import { api } from '../../utils/MoviesApi';


function App() {
  const history = useNavigate();
  const location = useLocation();

  const [isTooltipOpen, setTooltipOpen] = useState(false);
  const [isRequestFailed, setRequestFailed] = useState(false);

  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [currentUser, setCurrentUser] = useState({});
  const [searchValue, setSearchValue] = useState("");

  const [isInitialRender, setInitialRender] = useState(true);
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isUserLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    if (isLoggedIn) {
      mainApi
        .getUserInformation()
        .then((info) => {
          setLoggedIn(true)
          setCurrentUser(info)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }, [isLoggedIn])


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
  }, [])

  const handleRegestration = ({ name, email, password }) => {
    mainApi
      .signUp({ name, email, password })
      .then((res) => {
        if (res.statusCode !== 400) {
          handleLogin({ email, password })
          setRequestFailed(false);
          setTooltipOpen(false);
        }
      })
      .catch((err) => {
        setRequestFailed(true);
        setTooltipOpen(true);
        console.log(err)
      })
  };

  const handleLogin = ({ email, password }) => {
    setInitialRender(true);
    mainApi
      .signIn({ email, password })
      .then(() => {
        setLoggedIn(true);
        history('/movies')

      })
      .catch((err) => {
        setRequestFailed(true);
        setTooltipOpen(true);
        console.log(err)
      });
  };

  const handleLogout = () => {
    mainApi
      .logout()
      .then(() => {
        setLoggedIn(false);
        localStorage.removeItem("movies");
        localStorage.removeItem("settings");
        localStorage.removeItem("savedMovies");
        history("/");
      }).catch((err) => {
        setRequestFailed(true);
        setTooltipOpen(true);
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
        setRequestFailed(true);
        setTooltipOpen(true);
        console.log(err)
      })
  }

  const handleSaveMovie = (movie) => {
    mainApi
      .createMovies(movie)
      .then((newMovie) => {
        setSavedMovies([newMovie, ...savedMovies]);
        handleSavedMovies();
      }
      )
      .catch((error) => {
        setRequestFailed(true);
        setTooltipOpen(true);
        console.log(error);
      });
  }

  const handleDeleteMovie = (movieId) => {
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const filteredMovies = savedMovies.filter((movie) => movie._id !== movieId)
        setSavedMovies(filteredMovies);
        handleSavedMovies();
      })
      .catch((err) => {
        setRequestFailed(true);
        setTooltipOpen(true);
        console.log(err)
      });
  }

  const handleSavedMovies = () => {
    if (localStorage.getItem("settings") || location.pathname === "/saved-movies") {
      setInitialRender(false);
    }

    setLoading(true)
    mainApi
      .getSavedMovies()
      .then((data) => {
        setSavedMovies(data);
        localStorage.setItem('savedMovies', JSON.stringify(data));
      })
      .catch((err) => {
        setRequestFailed(true);
        setTooltipOpen(true);
        console.log(err)
      }).finally(() => {
        setLoading(false);
      })
  }

  const getBeatMovies = () => {
    if (localStorage.getItem("movies")) {
      setMovies(JSON.parse(localStorage.getItem("movies")));
      return;
    }

    setLoading(true);
    api.getMovies().then((initialMovies) => {
      setMovies(initialMovies);
      localStorage.setItem('movies', JSON.stringify(initialMovies));
    }).catch((err) => {
      setRequestFailed(true);
      setTooltipOpen(true);
      console.log(err)
    }).finally(() => {
      setLoading(false);
    })
  }

  const getSearchValue = useCallback((v) => setSearchValue(v), [searchValue]);

  const initialMovies = JSON.parse(localStorage.getItem("movies")) || [];
  const initialSavedMovies = JSON.parse(localStorage.getItem("savedMovies")) || [];

  const MoviesListWithProps = (
    <MoviesCardList
      movies={movies}
      savedMovies={savedMovies}
      getBeatMovies={getBeatMovies}
      onMovieLike={handleSaveMovie}
      isInitialRender={isInitialRender}
      onMovieDelete={handleDeleteMovie}
      handleSavedMovies={handleSavedMovies}
    />);

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
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isLoaded={isUserLoaded}
                >
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
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isLoaded={isUserLoaded}
                >
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
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isLoaded={isUserLoaded}
                >
                  <SearchForm
                    movies={movies}
                    setMovies={setMovies}
                    isLoading={isLoading}
                    initialMovies={initialMovies}
                    getSearchValue={getSearchValue}
                    cancelInitialRendeState={() => setInitialRender(false)}
                  />
                  {MoviesListWithProps}
                </ProtectedRoute>
              }
            />
            <Route
              path="/saved-movies"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isLoaded={isUserLoaded}
                >
                  <SearchForm
                    movies={savedMovies}
                    setMovies={setSavedMovies}
                    isLoading={isLoading}
                    initialMovies={initialSavedMovies}
                    getSearchValue={getSearchValue}
                    cancelInitialRendeState={() => null}
                  />
                  {MoviesListWithProps}
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute
                  isLoggedIn={isLoggedIn}
                  isLoaded={isUserLoaded}>
                  <Profile
                    handleLogout={handleLogout}
                    handleUpdateUser={handleUpdateUser} />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <LoadingPopup isOpen={isLoading || !isUserLoaded} />
          <InfoTooltip
            isOpen={isTooltipOpen}
            onClose={() => setTooltipOpen(false)}
            isRequestFailed={isRequestFailed}
          />
        </PageWrapper>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
