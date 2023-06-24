import { useAuthContext } from "../../../context/AuthProvider";
import "./MainMenuAdministration.css";
import { NavLink } from "react-router-dom";

export const MainMenuAdministration = () => {
  const currentUser = useAuthContext();
  return (
    <div className="admin-menu">
      <div className="admin-menu__container">
        <div className="admin-menu__container-nav">
          <NavLink
            to="/UserPageAdministration"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button className="admin-menu__button">Пользователи</button>
          </NavLink>
          <NavLink
            to="/TaskPageAdministration"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button className="admin-menu__button">Задачи</button>
          </NavLink>
          <NavLink
            to="/HardwarePageAdministration"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button className="admin-menu__button">Оборудование</button>
          </NavLink>
        </div>

        <div className="admin-menu__body">
          <div>Пользователь: {currentUser.name}</div>
        </div>
      </div>
    </div>
  );
};
