import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export default function PrivateRoute({ children, ...rest }) {
    let user = useContext(AuthContext).user;
    return user ? <Outlet /> : <Navigate to="/login" />;
}