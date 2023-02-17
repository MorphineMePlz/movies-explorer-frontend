import React from 'react'
import { Navigate } from 'react-router-dom'
import Preloader from '../Preloader/Preloader'

import { useLocation } from 'react-router-dom'

const PUBLIC_ROUTES = ["/signin", "/signup"];

export default function ProtectedRoute({ children, isLoaded, isLoggedIn }) {
  const location = useLocation();

  const MainPage = <Navigate replace to='/' />

  if (!isLoaded) {
    return <Preloader />
  }

  if (PUBLIC_ROUTES.includes(location.pathname)) {
    return !isLoggedIn && isLoaded ? children : MainPage
  }

  return isLoggedIn && isLoaded ? children : MainPage
}