import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({
  children,
  allowedRoles = [],
}) => {

  const token = localStorage.getItem(
    "edunexus_token"
  );

  const userData = localStorage.getItem(
    "edunexus_user"
  );

  if (!token || !userData) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  let user;

  try {
    user = JSON.parse(userData);
  } catch {
    localStorage.removeItem("edunexus_token");
    localStorage.removeItem("edunexus_user");

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  if (
    allowedRoles.length > 0 &&
    !allowedRoles.includes(user.role)
  ) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;