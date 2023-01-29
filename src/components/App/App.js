import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import MainPage from '../MainPage/MainPage';
import PageWrapper from '../PageWrapper/PageWrapper';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import './App.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <PageWrapper isLoggedIn={isLoggedIn}>
        <Routes>
          {/* <Route
          path='/signup'
          element={ <Register
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            />
          }
        /> */}
          {/* <Route
          path='/signin'
          element={ <Login
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            />
          }
        /> */}
          <Route
            exact='true'
            path='/'
            element={
              <MainPage />
            }
          />
          <Route path='/movies' element={
            <>
              <SearchForm />
              <MoviesCardList isSavedMovies />
            </>
          }
          />
          <Route path='/saved-movies' element={
            <>
              <SearchForm />
              <MoviesCardList />
            </>
          }
          />
          {/* <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Header loggedIn={loggedIn} />
              <SavedMovies />
              <Footer />
            </ProtectedRoute>
          }
          /> */}
          <Route path='/profile' element={
            // <ProtectedRoute loggedIn={loggedIn}>

            <>TEST</>
            /* <Profile /> */
            /* </ProtectedRoute> */
          }
          />
          {/* <Route path='*' element={ <NotFound /> } /> */}
        </Routes>
      </PageWrapper>
    </div>
  );
}

export default App;
