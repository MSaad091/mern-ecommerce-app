import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // call backend to validate cookie
    fetch("http://localhost:4000/user/validate", {
      method: "GET",
      credentials: "include" // ✅ important
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) setIsLoggedIn(true);
      })
      .catch(() => setIsLoggedIn(false));
  }, []);

  if (!isLoggedIn) return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
