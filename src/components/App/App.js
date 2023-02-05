import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import MainPage from "../MainPage/MainPage";
import PageWrapper from "../PageWrapper/PageWrapper";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Profile from "../Profile/Profile";
import Authorization from "../Authorization/Authorization";
import NotFound from "../NotFound/NotFound";

// import Preloader from "../Preloader/Preloader";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { PROFILE_MOCK_DATA } from "../../utils/utils";


function App() {
  const [isLoggedIn, setLoggedIn] = useState(true);

  return (
    <div className="page">
      <PageWrapper
        isLoggedIn={isLoggedIn}
        handleLogin={() => setLoggedIn(true)}
      >
        <Routes>
          <Route
            path="/signup"
            element={
              <Authorization
                isLogin={false}
                onSubmit={() => console.log("submit signup")}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <Authorization
                isLogin={true}
                onSubmit={() => console.log("submit signin")}
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
              <ProtectedRoute loggedIn={isLoggedIn}>
                <Profile data={PROFILE_MOCK_DATA} />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageWrapper>
    </div>
  );
}

export default App;
