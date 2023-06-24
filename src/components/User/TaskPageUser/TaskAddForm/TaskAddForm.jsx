import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TaskAddForm.css";
import { SelectUser } from "./SelectUser/SelectUser";
import { useAuthContext } from "../../../../context/AuthProvider";
import { TextDataField } from "./TextDataField/TextDataField";
import { HOST_ADDR } from "../../../../utils/ApiHostAdres";
import { convertToFormData } from "../../../../utils/convertToFormData";

const sendNewTaskData = async (token, formData, onSuccess) => {
  const data = convertToFormData(formData);
  try {
    const res = await fetch(HOST_ADDR + "/tasks/addNewTask", {
      method: "POST",
      headers: {
        Authorization: token,
      },
      body: data
    });
    if (res.ok) {
      const responseData = await res.json();
      onSuccess(responseData);
    } else {
      throw new Error("Server response was not ok");
    }
  } catch (error) {
    onSuccess(error);
  }
};

// appoint_user: "2"
// deadline: "2023-06-23"
// departmentId: "2"
// files: "C:\\fakepath\\15-ЭХ-2023_1-ЭОМ (изм. от 05.06.23) (3).pdf"
// positionsId: "4"
// responsible_user: ""
// subdepartmentId: "2"
// task_comment: "йцццййй"
// task_descript: "Устранить"
// task_id: "d05ba676-87ba-42b0-bd72-7146285e1264"
// task_priority: true
// task_status: "new"

export const TaskAddForm = () => {
  const currenUser = useAuthContext();

  const initValue = {
    task_id: uuidv4(),
    task_status: "new",
    appoint_user: currenUser.id,
    task_descript: "",
    task_priority: false,
    deadline: "",
    task_comment: "",
    files: [],
    responsible_user: "",
    departmentId: "",
    subdepartmentId: "",
    positionsId: "",
  };

  const [addNewtask, setAddNewTask] = useState(false);
  const [formData, setFormData] = useState(initValue); 
  const [reqStatus, setReqStatus] = useState();//console.log('reqStatus-TaskAddForm', reqStatus)

  const getInputData = (e) => {
    e.preventDefault();
    const { name, value, files, checked } = e.target;
    if (name === "files") {
      const data = Array.from(files);
      setFormData((prev) => ({ ...prev, files: data }));
    } else if (name === "task_priority") {
      const data = checked;
      setFormData((prev) => ({ ...prev, task_priority: data }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submit", formData);
    try {
      await sendNewTaskData(currenUser.token, formData, setReqStatus);
    } catch (error) {}
  };

  return (
    <>
      {!addNewtask ? (
        <button className="form__btn" onClick={() => setAddNewTask(true)}>
          Создать задачу
        </button>
      ) : (
        <div className="form" onSubmit={handleSubmit}>
          <form className="form__container">
            <TextDataField getData={getInputData} />
            <SelectUser getData={getInputData} />
            <label>
              Графическое изображение:
              <input
                className="form-input__file"
                type="file"
                name="files"
                onChange={getInputData}
                multiple
              ></input>
            </label>
            <button className="form__btn" type="submit">
              Создать
            </button>
            <button className="form__btn" onClick={() => setAddNewTask(false)}>
              Отмена
            </button>
          </form>
        </div>
      )}
    </>
  );
};
