import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { NavLink } from "react-router-dom";

const CtaButton = () => {
  const { auth } = useContext(AuthContext);

  return (
    <NavLink
      to={auth.accessToken ? "/myrecipes" : "/login"}
      className="clr-text button"
    >
      {auth.accessToken ? "Go to dashboard" : "Get Started"}
    </NavLink>
  );
};

export default CtaButton;
