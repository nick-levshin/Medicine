import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ADMIN_ROUTE, AUTH_ROUTE, HOME_ROUTE } from '../utils/consts';
import { useSelector } from 'react-redux';
import Auth from '../pages/Auth';
import Home from '../pages/Home';

const AppRouter = () => {
  const isAdmin = useSelector(
    (state) => state.user.currentUser.role === 'ADMIN'
  );
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <Routes>
      {!isAuth ? (
        <>
          <Route path={AUTH_ROUTE} element={<Auth />} />
          <Route path="/*" element={<Navigate to={AUTH_ROUTE} />} />
        </>
      ) : (
        <>
          <Route path={HOME_ROUTE} element={<Home />} />
          <Route path="/*" element={<Navigate to={HOME_ROUTE} />} />
        </>
      )}
    </Routes>
  );
};

export default AppRouter;
