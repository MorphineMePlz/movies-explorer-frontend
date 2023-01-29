import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Header from '../Header/Header';
import MainPage from '../MainPage/MainPage';
import Footer from '../Footer/Footer';
import PageWrapper from '../PageWrapper/PageWrapper';
// import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  
  return (
    <div className="App">
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
             <PageWrapper >
              <MainPage /> 
              </PageWrapper>
             }
          />
          <Route path='/movies' element={
            <PageWrapper>
              TEST
            </PageWrapper>
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
              <Header loggedIn={loggedIn} />
              /* <Profile /> */
            /* </ProtectedRoute> */
          }
          />
          {/* <Route path='*' element={ <NotFound /> } /> */}
    </Routes>
    </div>
  );
}

export default App;
