import { useState } from 'react';
import './TableUserView.css';
import { FormEditUser } from './FormEditUser/FormEditUser';

export const TableUserView = (props) => {
  const [isEditAction, setIsEditAction] = useState({ isEdit: false });
  const [userDataToEdit, setUserDataToEdit] = useState([]); //console.log('userDataToEdit', userDataToEdit);

  const handleEditActionOpen = (user) => {
    setIsEditAction({ isEdit: true });
    setUserDataToEdit(user);
  };

  const handleCancelEditActionCancel = () => {
    setIsEditAction({ isEdit: false });
  };

  const handleSendUpdatedUserData = (user) => {
    props.onUpdate(user);
  };

  const handleClickDelet = (user) => {};

  return (
    <>
      {props.users && (
        <>
          {isEditAction.isEdit && (
            <FormEditUser
              user={userDataToEdit}
              onSubmit={handleSendUpdatedUserData}
              onCancel={handleCancelEditActionCancel}
            />
          )}
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>Имя</th>
                <th>Email</th>
                <th>Роль</th>
                <th>Подразделение</th>
                <th>Отдел</th>
                <th>Должность</th>
                <th>Редактирование</th>
              </tr>
            </thead>
            <tbody>
              {props.users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id} </td>
                  <td>{user.name} </td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.department}</td>
                  <td>{user.subdepartment}</td>
                  <td>{user.position}</td>
                  <td>
                    <button onClick={() => handleEditActionOpen(user)}>
                      Изменить
                    </button>
                    <button onClick={() => handleClickDelet(user)}>
                      Удалить
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};
