import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";
import LoadingStage from "../pages/LoadingStage";

const PersistUserSession = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      if (location.pathname === "/") {
        setIsLoading(false);
        return null;
      }

      try {
        await refresh();
      } catch (err) {
        return navigate("/login", {
          state: {
            message: "Authentication Error. Please log in again.",
            error: true,
          },
        });
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>{!persist ? <Outlet /> : isLoading ? <LoadingStage /> : <Outlet />}</>
  );
};

export default PersistUserSession;
