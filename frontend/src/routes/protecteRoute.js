import React from "react";
import { Navigate } from "react-router-dom";
import { signIn } from "./route";
export const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("access_token");
    if (token)
        return children
    return <Navigate to={signIn} />
};