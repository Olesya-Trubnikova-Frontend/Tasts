import "./TaskTableView.css";
import { getAllUserTasks } from "../../../../api/User/Tasks/Tasks";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../context/AuthProvider";
import { getTaskFile } from "../../../../api/User/Tasks/getTaskFile";

export const TaskTableView = (props) => {
  const currenUser = useAuthContext();

  const [userTasks, setUserTask] = useState([]);
  const [resStaus, setReqStatus] = useState(null);
  const [img, setImg] = useState(); console.log('img', img)
  // console.log("userTasks", userTasks);
  const data = "1687419405397.jpg"

  useEffect(() => {
    if (currenUser.login) {
      try {
        getAllUserTasks(currenUser.token, setReqStatus)
          .then((data) => setUserTask(data))
          .catch((error) => console.log(error));

        getTaskFile(currenUser.token, data, setReqStatus)
          .then(data =>setImg(URL.createObjectURL(data)))
          .catch(error => console.log(error))
      } catch (error) {
        console.log(error);
      }
    }
  }, [currenUser]);



  const handleShow = (e) => {
    e.preventDefault();
    console.log("show big pick");

  };

  return (
    <>
      {/* <img src={img} alt="task file" /> */}
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>ID_задачи</th>
            <th>Статус</th>
            <th>Задача</th>
            <th>Приоритет</th>
            <th>Выполнить до</th>
            <th>Назначен</th>
            <th>Изображение</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {userTasks.map((task, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{task.task_id}</td>
              <td>{task.task_status}</td>
              <td>{task.task_description}</td>
              <td>{task.task_priority}</td>
              <td>{task.task_deadline}</td>
              <td>{task.task_assigned_to}</td>
              <td>
                {task.files.map((file, idx) => {
                  if (file.content) {
                    return (
                      <img
                        height="50px"
                        key={idx}
                        src={`data:${file.type};base64,${file.content}`}
                        alt="изображение"
                        onClick={handleShow}
                      />
                    );
                  }
                })}
              </td>
              <td>
                <button>изменить</button>
                <button>удалить</button>
                <button>детали</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
