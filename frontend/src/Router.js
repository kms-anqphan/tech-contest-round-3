import React, { useEffect } from "react";
import { useNavigate, useLocation, useRoutes } from "react-router-dom";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

import TokenService from "./services/TokenService";

export default function Router() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!TokenService.getUser()) {
      navigate('/login', { replace: true });
    } else if (location.pathname === '/login') {
      navigate('/', { replace: true });
    }
  }, [navigate, location]);

  return useRoutes([
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/login',
      element: <Login />
    }
  ])
}
