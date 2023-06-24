import "./MainPageAdministration.css";
import { MainMenuAdministration } from "../MainMenuAdministration/MainMenuAdministration";

export const MainPageAdministration = () => {
  return (
    <div className="admin-main-page">
      <div className="admin-main-page__containre">
        <MainMenuAdministration />
      </div>
      <div className="admin-main-page__containre">
        Главная страница
      </div>
    </div>
  );
};
