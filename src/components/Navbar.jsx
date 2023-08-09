import { useContext, useState } from "react";
import ThemeContext from "../context/ThemeContext";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { IconHome, IconLogin } from "@tabler/icons-react";

const Navbar = () => {
  const { theme, handleTheme } = useContext(ThemeContext);
  const { auth } = useAuth();
  const [mobileNav, setMobileNav] = useState(false);

  const handleMobileNav = () => {
    setMobileNav((prev) => !prev);
  };

  return (
    <div className="nav-container" data-theme={theme}>
      <a className="logo" href="#">
        <svg
          className="logo"
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="240.000000pt"
          height="212.000000pt"
          viewBox="0 0 240.000000 212.000000"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            transform="translate(0.000000,212.000000) scale(0.100000,-0.100000)"
            fill="#000000"
            stroke="none"
          >
            <path
              d="M230 1931 c0 -6 15 -11 33 -11 39 0 90 -29 114 -67 16 -24 18 -58 21
-330 l3 -303 70 0 69 0 0 331 0 331 158 -4 c119 -4 167 -9 199 -22 72 -30 130
-112 152 -214 14 -69 14 -109 -1 -115 -10 -4 -10 -8 1 -15 17 -12 2 -92 -29
-151 -24 -49 -90 -106 -144 -125 -40 -14 -39 -14 81 -15 l122 -1 34 43 c19 23
46 65 60 92 l26 50 1 -92 0 -93 70 0 70 0 0 121 0 122 79 -6 c138 -9 230 -81
247 -193 l6 -44 79 0 79 0 0 28 c0 40 -42 122 -84 163 -87 86 -195 119 -393
119 l-133 0 0 35 c0 148 -74 266 -207 332 l-77 38 -353 3 c-244 2 -353 0 -353
-7z"
            />
            <path
              d="M70 1121 c0 -28 5 -51 10 -51 6 0 10 7 10 17 0 15 1 15 18 0 10 -10
25 -17 33 -17 10 1 8 5 -6 16 -16 12 -17 18 -8 33 14 23 5 38 -30 46 -27 7
-27 7 -27 -44z m42 14 c0 -5 -5 -11 -11 -13 -6 -2 -11 4 -11 13 0 9 5 15 11
13 6 -2 11 -8 11 -13z"
            />
            <path
              d="M257 1163 c-4 -3 -7 -26 -7 -50 0 -43 0 -43 36 -43 21 0 33 4 29 10
-3 6 -15 10 -26 10 -10 0 -19 5 -19 10 0 6 9 10 20 10 11 0 20 5 20 10 0 6 -9
10 -20 10 -11 0 -20 5 -20 10 0 6 12 10 26 10 14 0 23 4 19 10 -7 11 -48 14
-58 3z"
            />
            <path
              d="M447 1152 c-20 -22 -22 -53 -5 -70 15 -15 54 -16 63 -2 4 6 -7 10
-25 10 -28 0 -31 3 -28 28 2 23 7 27 31 25 29 -2 37 11 11 21 -24 9 -29 8 -47
-12z"
            />
            <path d="M627 1163 c-11 -10 -8 -93 3 -93 6 0 10 23 10 50 0 51 -1 55 -13 43z" />
            <path
              d="M767 1163 c-11 -10 -8 -93 3 -93 6 0 10 7 10 15 0 8 11 17 25 21 33
8 35 49 3 58 -29 7 -33 7 -41 -1z m43 -28 c0 -8 -7 -15 -15 -15 -8 0 -15 7
-15 15 0 8 7 15 15 15 8 0 15 -7 15 -15z"
            />
            <path
              d="M950 1120 c0 -49 1 -50 30 -50 17 0 30 5 30 10 0 6 -11 10 -25 10
-14 0 -25 5 -25 10 0 6 12 10 26 10 14 0 23 4 19 10 -3 6 -15 10 -26 10 -10 0
-19 5 -19 10 0 6 12 10 26 10 14 0 23 4 19 10 -3 6 -17 10 -31 10 -22 0 -24
-4 -24 -50z"
            />
            <path d="M1123 1154 c-3 -8 -1 -20 6 -27 8 -8 11 -4 11 16 0 30 -7 35 -17 11z" />
            <path
              d="M1273 1163 c-23 -9 -14 -43 14 -54 20 -7 23 -13 15 -21 -9 -9 -15 -9
-24 0 -18 18 -33 15 -18 -3 18 -22 54 -15 58 11 2 15 -3 23 -17 27 -12 3 -21
10 -21 17 0 7 8 9 20 5 24 -7 27 10 4 19 -9 3 -16 6 -17 5 -1 0 -8 -3 -14 -6z"
            />
            <path
              d="M1577 1163 c-4 -3 -7 -26 -7 -50 0 -44 0 -44 33 -41 29 3 32 6 34 38
2 44 -36 78 -60 53z m43 -23 c0 -5 -7 -10 -15 -10 -8 0 -15 5 -15 10 0 6 7 10
15 10 8 0 15 -4 15 -10z m-2 -42 c-6 -18 -28 -21 -28 -4 0 9 7 16 16 16 9 0
14 -5 12 -12z"
            />
            <path
              d="M1778 1159 c-12 -6 -18 -22 -18 -44 0 -29 4 -36 25 -41 35 -9 53 1
61 31 4 18 1 32 -11 45 -20 22 -32 24 -57 9z m47 -39 c0 -16 -6 -26 -19 -28
-24 -5 -37 17 -25 41 14 26 44 17 44 -13z"
            />
            <path
              d="M1982 1154 c-39 -27 -23 -84 23 -84 12 0 26 5 33 12 19 19 15 66 -7
78 -25 13 -22 13 -49 -6z m46 -37 c3 -22 -1 -27 -18 -27 -23 0 -35 22 -26 46
10 25 41 12 44 -19z"
            />
            <path
              d="M2170 1121 c0 -28 5 -51 10 -51 6 0 10 7 10 17 0 15 1 15 18 0 10
-10 25 -17 32 -17 9 0 6 7 -8 20 -26 24 -27 33 -7 50 8 7 15 17 15 23 0 6 -11
0 -25 -13 -20 -19 -25 -20 -25 -7 0 9 -4 19 -10 22 -6 4 -10 -13 -10 -44z"
            />
            <path
              d="M398 787 c-3 -183 -5 -217 -21 -240 -24 -37 -59 -58 -107 -64 -22 -3
-40 -10 -40 -14 0 -5 106 -9 235 -9 150 0 235 4 235 10 0 6 -11 10 -25 10 -43
0 -94 27 -115 62 -18 30 -20 50 -20 246 l0 212 -69 0 -70 0 -3 -213z"
            />
            <path
              d="M858 943 c28 -32 116 -130 196 -218 l145 -160 1 -208 0 -208 -32 17
c-97 50 -182 177 -213 319 -9 41 -21 72 -26 69 -27 -16 0 -194 42 -276 52
-103 178 -198 309 -234 126 -34 356 -28 463 13 27 11 95 19 192 23 83 4 158
11 168 15 34 14 16 25 -45 25 -35 0 -80 5 -100 10 l-37 11 45 41 c27 25 59 70
82 116 36 74 37 79 36 181 0 136 -22 196 -102 282 -62 68 -122 103 -231 134
l-73 22 36 22 c20 13 41 31 46 42 10 18 7 19 -59 19 -64 0 -71 -2 -102 -32
-44 -40 -104 -68 -152 -68 -26 0 -37 -4 -35 -12 3 -9 35 -15 89 -19 288 -20
443 -170 426 -410 -3 -54 -13 -96 -32 -136 -26 -57 -79 -123 -99 -123 -26 0
-163 116 -303 257 l-153 152 0 195 0 196 -70 0 -69 0 -3 -114 -3 -114 -103
114 -104 114 -90 0 -90 0 50 -57z m731 -754 c40 -27 77 -49 82 -49 5 0 9 -4 9
-9 0 -23 -226 -41 -309 -25 l-31 7 0 144 0 145 88 -83 c48 -45 120 -104 161
-130z"
            />
          </g>
        </svg>
      </a>

      <nav
        id="primary-navigation"
        className={`primary-navigation ${mobileNav ? "open" : ""}`}
        aria-label="primary"
      >
        <ul
          className={`${
            mobileNav ? "mobile-nav__active" : ""
          } nav-list | fw-medium`}
          role="list"
        >
          <li role="listitem">
            <NavLink to="/">
              <span className="material-icons">home</span>
              <span className="sm-hidden">Home</span>
            </NavLink>
          </li>
          {auth?.accessToken ? (
            <>
              <li role="listitem">
                <NavLink to="/myrecipes">
                  <span className="material-icons">dashboard</span>
                  <span className="sm-hidden">Dashboard</span>
                </NavLink>
              </li>
              <li role="listitem">
                <NavLink to="/logout">
                  <span className="material-icons">logout</span>
                  <span className="sm-hidden">Log out</span>
                </NavLink>
              </li>
            </>
          ) : (
            <li role="listitem">
              <NavLink to="/login">
                {/* <IconLogin size={"24px"} /> */}
                <span className="material-icons">login</span>
                <span className="sm-hidden">Log in</span>
              </NavLink>
            </li>
          )}
          <li className="lg-hidden" onClick={handleMobileNav}>
            <span className={`${mobileNav ? "open" : ""}  mobile-nav__menu`}>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </span>
          </li>
        </ul>
      </nav>
      <button className="theme-btn" onClick={handleTheme} data-theme={theme}>
        {theme === "light" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-moon"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"></path>
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-sun"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0"></path>
            <path d="M3 12h1m8 -9v1m8 8h1m-9 8v1m-6.4 -15.4l.7 .7m12.1 -.7l-.7 .7m0 11.4l.7 .7m-12.1 -.7l-.7 .7"></path>
          </svg>
        )}
      </button>
    </div>
  );
};

export default Navbar;
