import { useAuthContext } from "../../../context/AuthProvider";
import "./Header.css";
import { NavLink } from "react-router-dom";

export const Header = () => {
  const curentUserContext = useAuthContext();

  return (
    <header className="header">
      <div className="header__container">
        {curentUserContext.login ? (
          <>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <button className="header__button">На главную</button>
            </NavLink>
            <NavLink
              to="/logout"
              onClick={curentUserContext.logout}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <button className="header__button">Выход</button>
            </NavLink>
          </>
        ) : (
          <>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <button className="header__button">На главную</button>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <button className="header__button">Войти</button>
            </NavLink>
            <NavLink
              to="/registration"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <button className="header__button">Регистрация</button>
            </NavLink>
          </>
        )}
      </div>
    </header>
  );
};
