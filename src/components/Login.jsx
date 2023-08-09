import { IconLock, IconCheck, IconUser, IconX } from "@tabler/icons-react";
import { useContext, useEffect, useRef, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LoaderSpinner from "./LoaderSpinner";
import AuthContext from "../context/AuthContext";
import axios from "../api/axios";
import { Endpoint } from "../constants/endpoints.js";

const Login = () => {
  const { setAuth, persist, setPersist } = useContext(AuthContext);
  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/myrecipes";

  const toastRef = useRef();
  const errRef = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errMsg, setErrMsg] = useState("");
  const [isError, setIsError] = useState(false);
  const [loader, setLoader] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (location.state?.error) {
      setIsError(true);
    }

    if (location.state?.newUser || isError) {
      toastRef.current.classList.add("active");

      setTimeout(() => {
        toastRef.current.classList?.remove("active");

        setTimeout(() => {
          toastRef.current.remove();
        }, 1000);
      }, 5000);
    }
  }, [location.state, isError]);

  useEffect(() => {
    setErrMsg("");
  }, [username, password]);

  const handlePasswordToggle = (e) => {
    let $input = e.target;

    if (passwordVisible) {
      $input.previousElementSibling.setAttribute("type", "password");
      $input.textContent = "visibility_off";
      setPasswordVisible(false);
    } else {
      $input.previousElementSibling.setAttribute("type", "text");
      $input.textContent = "visibility";
      setPasswordVisible(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoader(true);

      const response = await axios.post(
        Endpoint.USER.LOGIN,
        JSON.stringify({
          username,
          password,
        }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      if (!response.data.ok || response.data.message === "Failed to fetch") {
        throw response;
      }

      const user = response.data.user;
      const accessToken = response.data.accessToken;

      await setAuth({ user, accessToken });

      return navigate(from, { replace: true });
    } catch (err) {
      if (!err || err.code === "ERR_NETWORK") {
        return setErrMsg("No Server Response. Please try again");
      }

      setErrMsg(err.response.data.message);
      errRef.current.focus();
    } finally {
      setLoader(false);
    }
  };

  const handlePersist = () => setPersist((prev) => !prev);

  useEffect(() => {
    localStorage.setItem("persist", persist);
  }, [persist]);

  return (
    <section className="wrapper login | padding-block-700">
      {location.state?.message ? (
        <div className="notifications">
          <div
            className={`toast ${isError ? "error" : "error"}`}
            ref={toastRef}
          >
            {isError ? (
              <IconX className="toast-check error" color="#000" size={"24px"} />
            ) : (
              <IconCheck className="toast-check" color="#000" size={"24px"} />
            )}
            <div className={isError ? "toast-message error" : "toast-message"}>
              <span className="toast-message__status">
                {isError ? "Failed" : "Success"}
              </span>
              <span className="toast-message__text">
                {location.state.message}
              </span>
            </div>
            <IconX
              className="toast-close"
              color="#000"
              size={"16px"}
              onClick={() => toastRef.current.classList.remove("active")}
            />

            <div
              className={isError ? "toast-progress error" : "toast-progress"}
            ></div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="login-card | flow">
        <div className="login-card__header">
          <h4>Log in</h4>
        </div>
        <p
          ref={errRef}
          className={errMsg ? "err-message" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-form__item">
            <label htmlFor="username">
              <IconUser color="#000" />
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-input"
              placeholder="Username"
              autoComplete="off"
              required
              autoFocus
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="login-form__item">
            <label htmlFor="password">
              <IconLock color="#000" />
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-input"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="reveal-password material-icons"
              onClick={handlePasswordToggle}
            >
              visibility_off
            </span>
          </div>
          {loader ? (
            <LoaderSpinner />
          ) : (
            <button type="submit" className="form-btn">
              Log in
            </button>
          )}

          <div className="persist-session">
            <input
              type="checkbox"
              name="session"
              id="session"
              onChange={handlePersist}
              checked={persist}
            />
            <label htmlFor="session">Remember me</label>
          </div>
          <div className="sign-up">
            <p>Don&apos;t have an account yet?</p>
            <NavLink to="/signup">Sign up now</NavLink>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
