import {
  IconMail,
  IconLock,
  IconUser,
  IconUserCheck,
  IconAlertCircleFilled,
  IconMailCheck,
  IconLockCheck,
} from "@tabler/icons-react";
import { useRef, useState, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import LoaderSpinner from "./LoaderSpinner";
import axios from "../api/axios";
import { Endpoint } from "../constants/endpoints";

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/i,
  PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
  EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const Signup = () => {
  const navigate = useNavigate();

  const errRef = useRef();
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const matchRef = useRef();

  const [username, setUsername] = useState("");
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [password, setPassword] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [loader, setLoader] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    const result = USER_REGEX.test(username);

    setValidUsername(result);
  }, [username]);

  useEffect(() => {
    const result = PWD_REGEX.test(password);

    setValidPwd(result);

    const match = password === matchPwd;

    setValidMatch(match);
  }, [password, matchPwd]);

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);

    setValidEmail(result);
  }, [email]);

  useEffect(() => {
    setErrMsg("");
  }, [username, email, password, matchPwd]);

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

  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // only if button was tampered with

    const v1 = USER_REGEX.test(username);
    const v2 = EMAIL_REGEX.test(email);
    const v3 = PWD_REGEX.test(password);
    const v4 = password === matchPwd;

    if (!v1) {
      usernameRef.current.focus();
    } else if (!v2) {
      emailRef.current.focus();
    } else if (!v3) {
      passwordRef.current.focus();
    } else if (!v4) {
      matchRef.current.focus();
    }

    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg("Invalid entry");
      return;
    }

    try {
      setLoader(true);

      const response = await axios.post(
        Endpoint.USER.REGISTER,
        JSON.stringify({ username, email, password }),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        },
      );

      if (!response.data.ok) throw response;

      setUsername("");
      setEmail("");
      setPassword("");
      setMatchPwd("");

      return navigate("/login", {
        state: {
          from: location,
          message: "Your account has been created",
          newUser: true,
          error: false,
        },
      });
    } catch (err) {
      if (!err || err.code === "ERR_NETWORK") {
        return setErrMsg("No Server Response. Please try again");
      }

      if (err.response.status === 409) {
        setErrMsg(
          `${err.response.data.duplicates.map(
            (dup) => `${dup.charAt(0).toUpperCase() + dup.slice(1)} `,
          )}taken`,
        );
        return errRef.current.focus();
      }

      setErrMsg("Unexpected error. Please try again");
      errRef.current.focus();
    } finally {
      setLoader(false);
    }
  };

  return (
    <section className="wrapper login | padding-block-700">
      <div className="login-card | flow">
        <div className="login-card__header">
          <h4>Sign Up</h4>
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
              {!validUsername ? (
                <IconUser color="#000" />
              ) : (
                <IconUserCheck color="var(--clr-success)" />
              )}
            </label>
            <input
              type="text"
              name="username"
              id="username"
              className="form-input"
              placeholder="Username"
              ref={usernameRef}
              autoComplete="off"
              required
              autoFocus
              value={username}
              aria-invalid={validUsername ? "false" : "true"}
              aria-describedby="uidnote"
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
            />
          </div>
          <p
            id="uidnote"
            className={`input-error ${usernameFocus && username && !validUsername
                ? "err-visible"
                : "offscreen"
              }`}
          >
            <IconAlertCircleFilled />4 to 32 characters.
            <br />
            Must begin with a letter.
            <br />
            Letters, numbers, underscores hyphens allowed.
          </p>
          <div className="login-form__item">
            <label htmlFor="email">
              {!validEmail ? (
                <IconMail color="#000" />
              ) : (
                <IconMailCheck color="var(--clr-success)" />
              )}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-input"
              placeholder="Email"
              ref={emailRef}
              autoComplete="off"
              required
              value={email}
              aria-invalid={validEmail ? "false" : "true"}
              aria-describedby="emailnote"
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </div>
          <p
            id="emailnote"
            className={`input-error ${emailFocus && email && !validEmail ? "err-visible" : "offscreen"
              }`}
          >
            <IconAlertCircleFilled />
            Please provide a valid email.
          </p>
          <div className="login-form__item">
            <label htmlFor="password">
              {!validPwd ? (
                <IconLock color="#000" />
              ) : (
                <IconLockCheck color="var(--clr-success)" />
              )}
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-input"
              placeholder="Password"
              ref={passwordRef}
              required
              value={password}
              aria-invalid={validPwd ? "false" : "true"}
              aria-describedby="pwdnote"
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPwdFocus(true)}
              onBlur={() => setPwdFocus(false)}
            />
            <span
              className="reveal-password material-icons"
              onClick={handlePasswordToggle}
            >
              visibility_off
            </span>
          </div>
          <p
            id="pwdnote"
            className={`input-error ${pwdFocus && password && !validPwd ? "err-visible" : "offscreen"
              }`}
          >
            <IconAlertCircleFilled />
            <small>
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{" "}
              <span aria-label="exclamation mark">!, </span>
              <span aria-label="at symbol">@, </span>
              <span aria-label="hashtag">#, </span>
              <span aria-label="dollar sign">$, </span>
              <span aria-label="percent">%</span>
            </small>
          </p>
          <div className="login-form__item">
            <label htmlFor="confirm-password">
              {!matchPwd || !validMatch || !validPwd ? (
                <IconLock color="#000" />
              ) : (
                <IconLockCheck color="var(--clr-success)" />
              )}
            </label>
            <input
              type="password"
              name="confirm-password"
              id="confirm-password"
              className="form-input"
              placeholder="Confirm password"
              ref={matchRef}
              required
              value={matchPwd}
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="matchnote"
              onChange={(e) => setMatchPwd(e.target.value)}
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
            />

            <span
              className="reveal-password material-icons"
              onClick={handlePasswordToggle}
            >
              visibility_off
            </span>
          </div>
          <p
            id="matchnote"
            className={`input-error ${matchFocus && !validMatch ? "err-visible" : "offscreen"
              }`}
          >
            <IconAlertCircleFilled />
            Both passwords must match
          </p>
          {!loader ? (
            <button
              type="submit"
              className={`form-btn ${!validEmail || !validMatch || !validPwd || !validUsername
                  ? "not-allowed"
                  : "pointer"
                }`}
            >
              Sign up
            </button>
          ) : (
            <LoaderSpinner />
          )}
          <div className="sign-up">
            <p>Already have an account?</p>
            <NavLink to="/login">Log in</NavLink>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Signup;
