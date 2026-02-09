import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/index.ts';


const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

  if (loading || isAuthenticated === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }
      
    
  

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;