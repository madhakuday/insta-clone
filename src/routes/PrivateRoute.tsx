import { useAuth0 } from "@auth0/auth0-react";
import Loader from "../components/Loader/Loader";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const location = useLocation();

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      {isAuthenticated ? (
        <Outlet />
      ) : (
        <Navigate to="/" replace={true} state={location} />
      )}
    </>
  );
};

export default PrivateRoute;
