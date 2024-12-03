import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

  const token = localStorage.getItem('current-token'); // トークンの有無を確認
  if (!token) {
      return <Navigate to="/" />;
  }
  return children;

};

export default PrivateRoute;