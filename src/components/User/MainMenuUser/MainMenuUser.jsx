import { useAuthContext } from "../../../context/AuthProvider";
import "./MainMenuUser.css";
import { NavLink } from "react-router-dom";

export const MainMenuUser = () => {
  const currentUser = useAuthContext();

  return (
    <div className="user-menu">
      <div className="user-menu__container">
        <div className="user-menu__container-nav">
          <NavLink
            to="/TaskPageUser"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button className="user-menu__button">Задачи</button>
          </NavLink>
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <button className="user-menu__button">New_tab</button>
          </NavLink>
        </div>

        <div className="user-menu__body">
          <div>Пользователь: {currentUser.name}</div>
          <div>Пользователь: {currentUser.role}</div>
          <div>Департамент: {currentUser.dep}</div>
          <div>Отдел: {currentUser.subDep}</div>
          <div>Должность: {currentUser.position}</div>
        </div>
      </div>
    </div>
  );
};
