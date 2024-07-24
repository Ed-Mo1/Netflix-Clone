import { onAuthStateChanged } from "firebase/auth";
import React, { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/fire-base";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  useLayoutEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/Netflix-Clone/login");
      }
    });
    return () => unsubscribe();
  }, []);
  return children;
};

export default ProtectedRoute;
