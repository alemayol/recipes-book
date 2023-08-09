import useAuth from "./useAuth";
import axios from "../api/axios";

const REFRESH_URL = "/refresh_token";

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const response = await axios.get(REFRESH_URL, {
      withCredentials: true,
    });

    setAuth((prev) => ({
      ...prev,
      user: { username: response.data.user.username },
      accessToken: response.data.accessToken,
    }));

    return response.data.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
