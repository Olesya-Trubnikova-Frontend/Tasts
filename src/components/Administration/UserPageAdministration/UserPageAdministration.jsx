import "./UserPageAdministration.css";
import { MainMenuAdministration } from "../MainMenuAdministration/MainMenuAdministration";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../context/AuthProvider";
import { getAllUsers, sendUpadteUserData,} from "../../../api/Administration/users/getAllUsers";
import { TableUserView } from "./TableUserView/TableUserView";

export const UserPageAdministration = () => {
  const currUser = useAuthContext();

  const [users, setUsers] = useState([]);  //console.log("users", users);
  const [reqStatus, setReqStatus] = useState([]);// console.log("reqStatus", reqStatus);
  const [updated, setUpdated] = useState(false)

  const handeleUpdateUser = async(user)=>{
    console.log('handeleUpdateUser', user)
    try {
      setUpdated(true)
        console.log('handeleUpdateUser -> sendUpadteUserData()', user)
        await sendUpadteUserData(currUser.token, user, setReqStatus)
      setUpdated(false)
    } catch (error) {
      
    }
  }

  useEffect(() => {
    if (currUser.login) {
      try {
        getAllUsers(currUser.token, setReqStatus)
          .then((data) => setUsers(data))
          .catch((error) => console.log(error));
      } catch (error) {}
    }
  }, [currUser, updated]);

  return (
    <div className="admin-user-page">
      <div className="admin-user-page__containre">
        Редактирование пользователей
      </div>
      <div className="admin-user-page__containre">
        <MainMenuAdministration />
      </div>
      <div className="admin-user__body">
        <TableUserView
          users = {users}
          onUpdate ={handeleUpdateUser}
        />
      </div>
    </div>
  );
};
