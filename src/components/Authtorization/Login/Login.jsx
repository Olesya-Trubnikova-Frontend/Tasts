import "./Login.css";
import { useState } from "react";
import { HOST_ADDR } from "../../../utils/ApiHostAdres";

const initValue = { name: "", password: "" };

const sendAuthData = async (authData, apiHostAddr) => {
  console.log('>>>>>>>>>>>>>>>')
  try {
    const response = await fetch(apiHostAddr + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(authData),
    });
    const data = await response.json();
    const token = response.headers.get("Authorization");
    if (token === null) {
      console.log("Token not found !sendAuthData!");
    } else {
      console.log("sendAuthData>>>", data);
      localStorage.setItem("token", token);
      localStorage.setItem("userName", data.name);
      localStorage.setItem("userRole", data.role);
      localStorage.setItem("userId", data.id);
      localStorage.setItem("dep", data.dep);
      localStorage.setItem("subDep", data.subDep);
      localStorage.setItem("positon", data.position);
      window.location.href = "/";
    }
  } catch (error) {
    // console.log('sendAuthData ERROR', error)
  }
};

export const Login = () => {
  const [formData, setFormData] = useState(initValue);
  const [emptyFields, setEmptyFields] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formData.name && formData.password) {
      setEmptyFields(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.password) {
      return setEmptyFields(true);
    }
    sendAuthData(formData, HOST_ADDR);
    setEmptyFields(false);
    setFormData(initValue);
  };

  return (
    <div className="login">
      <div className="login__container">
        <div className="login__message">
          {emptyFields ? <p>Заполните все поля</p> : <></>}
        </div>
        <form className="login__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="login__input"
            placeholder="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="password"
            className="login__input"
            placeholder="Пароль"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="login__submit-button">
            Войти
          </button>
        </form>
      </div>
    </div>
  );
};
