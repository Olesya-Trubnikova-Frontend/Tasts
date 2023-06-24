import "./Registration.css";
import { useState } from "react";
import { HOST_ADDR } from "../../../utils/ApiHostAdres";

const initValue = { name: "", email: "", password: "" };

const sendRegData = async (regData, apiHostAddr) => {
  try {
    const response = await fetch(apiHostAddr + "/auth/registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(regData),
    });
    const data = await response.json(); // <--- получаем ответ
    if (response.ok) {
      const token = response.headers.get("Authorization");
      if (token === null) {
        console.log("Token not found!");
      } else {
        localStorage.setItem("token", token);
        window.location.href = "/Login";
      }
    } else {
      console.log(data.Registrtaion);
    }
  } catch (error) {
    // console.log('sendRegData ERROR', error)
  }
};

export const Registration = () => {
  const [formData, setFormData] = useState(initValue);
  const [emptyFields, setEmptyFields] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (formData.name && formData.email && formData.password) {
      setEmptyFields(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      return setEmptyFields(true);
    }
    sendRegData(formData, HOST_ADDR);
    setEmptyFields(false);
    setFormData(initValue);
  };

  return (
    <div className="registration">
      <div className="registration__container">
        <div className="registration__message">
          {emptyFields ? <p>Заполните все поля</p> : <></>}
        </div>
        <form className="registration__form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="registration__input"
            placeholder="Имя"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="text"
            className="registration__input"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="password"
            className="registration__input"
            placeholder="Пароль"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button type="submit" className="registration__submit-button">
            Зарегистрироватся
          </button>
        </form>
      </div>
    </div>
  );
};
