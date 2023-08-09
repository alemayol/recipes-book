import { useEffect, useState } from "react";
import useLogOut from "../hooks/useLogOut";
import { Navigate } from "react-router-dom";
import LoadingStage from "./LoadingStage";

const LogOut = () => {
  const logout = useLogOut();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const signOut = async () => {
      try {
        await logout();
      } catch (error) {
        console.log(error);
      } finally {
        mounted && setIsLoading(false);
      }
    };

    signOut();

    return () => {
      mounted = false;
      setIsLoading(false);
    };
  }, []);

  return isLoading ? <LoadingStage /> : <Navigate to="/" replace />;
};

export default LogOut;
