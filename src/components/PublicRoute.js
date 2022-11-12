import { Navigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

export default function PrivateRoute({ children }) {
  const { currentUser } = UseAuth();
  return !currentUser ? children : <Navigate to="/" />;
}
