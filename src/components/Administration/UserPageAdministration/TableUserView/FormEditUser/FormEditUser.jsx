import "./FormEditUser.css";
import { useState, useEffect } from "react";
import { DepartmentSelect } from "../../../../SelectFields/HoldinStuct/Dep/DepartmentSelect";
import { SubDepartmenSelect } from "../../../../SelectFields/HoldinStuct/SubDep/SubDepartmenSelect";
import { PositionSelect } from "../../../../SelectFields/HoldinStuct/Position/PositionSelect";

export const FormEditUser = (props) => {
  const { user, onSubmit, onCancel } = props;

  const [editUser, setEditUser] = useState({
    name: user.name,
    email: user.email,
    role: user.role,
    departmentId: user.department_id,
    subdepartmentId: user.subdepartment_id,
    positionsId: user.position_id,
  });

  useEffect(() => {
    setEditUser({
      name: user.name,
      email: user.email,
      role: user.role,
      departmentId: user.department_id,
      subdepartmentId: user.subdepartment_id,
      positionsId: user.position_id,
    });
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleGetDataFormSelect = (e) => {
    const {name, value} = e.target
    console.log('name: ', name, 'value: ', value)
    setEditUser((prev) => ({
      ...prev,
      [name]:value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ id: user.id, ...editUser });
  };

  const handleCancelEdit = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit} className="edit-user-form">
      <label htmlFor="name">
        Имя:
        <input
          type="text"
          id="name"
          name="name"
          value={editUser.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="email">
        Email:
        <input
          type="text"
          id="email"
          name="email"
          value={editUser.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="role">
        Роль:
        <input
          type="text"
          id="role"
          name="role"
          value={editUser.role}
          onChange={handleChange}
        />
      </label>
      <label>
        <DepartmentSelect
          value={editUser.departmentId}
          onChange={handleGetDataFormSelect}
        />
      </label>
      <label>
        <SubDepartmenSelect
          value={editUser.subdepartmentId}
          onChange={handleGetDataFormSelect}
          filterBy={editUser.departmentId}
        />
      </label>
      <label>
        <PositionSelect
          value={editUser.positionsId}
          onChange={handleGetDataFormSelect}
          filterBy={editUser.subdepartmentId}
        />
      </label>

      <button type="submit">Сохранить</button>
      <button onClick={handleCancelEdit}>Отменить</button>
    </form>
  );
};
