import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import PageSkeleton from '../pages/Skeleton/bannerskeleton'
import 'react-loading-skeleton/dist/skeleton.css';



const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, loading } = useContext(AuthContext);
  if (loading) {
    return <PageSkeleton />;
    
    
  }

  if (!user || !user.role) {
    console.warn("🚨 Unauthorized access attempt - No user or role found!");
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    console.warn(`🚨 Access Denied: Expected "${requiredRole}", but found "${user.role}"`);
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;
