import "./MainContent.css";
import { useAuthContext } from "../../../context/AuthProvider";
import { MainPageAdministration } from "../../Administration/MainPageAdministration/MainPageAdministration";
import { MainPageUser } from "../../User/MainPageUser/MainPageUser";

export const MainContent = () => {
  const curUserData = useAuthContext();

  return (
    <main className="main-content">
      <div className="main-content__container">
        {curUserData.login ? (
          <>
            {curUserData.role === "admin" ? (
              <>
                <MainPageAdministration />
              </>
            ) : (
              <>
                <MainPageUser />
              </>
            )}
          </>
        ) : (
          <>Не авторизованы.</>
        )}
      </div>
    </main>
  );
};
