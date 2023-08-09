import { useNavigate } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "./useAuth";

const LOGOUT_URL = "/logout";

const useLogOut = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    setAuth({});

    try {
      const response = await axios.get(LOGOUT_URL, {
        withCredentials: true,
      });

      if (response.status === 204) return navigate("/");
    } catch (err) {
      return navigate("/");
    }
  };

  return logout;
};

export default useLogOut;
