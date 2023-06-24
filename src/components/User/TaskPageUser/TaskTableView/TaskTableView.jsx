import "./TaskTableView.css";
import { getAllUserTasks } from "../../../../api/User/Tasks/Tasks";
import { useEffect, useState } from "react";
import { useAuthContext } from "../../../../context/AuthProvider";

export const TaskTableView = (props) => {
  const currenUser = useAuthContext();

  const [userTasks, setUserTask] = useState([]);
  console.log("userTasks", userTasks);
  const [resStaus, setReqStatus] = useState(null);

  const [taskFiles, setTaskFiles] = useState([]);
  console.log("taskFiles", taskFiles);


  useEffect(() => {
    if (currenUser.login) {
      try {
        getAllUserTasks(currenUser.token, setReqStatus)
          .then((data) => {
            setUserTask(data);
            console.log(data)
            // создаем новый объект с уникальными ключами для каждого значения file_name
            const allFilesObj = data.reduce((prev, current) => {
              current.file_names.forEach((file_name, index) => {
                prev[`file${index + 1}`] = file_name;
              });
              return prev;
            }, {});
            setTaskFiles(allFilesObj);
          })
          .catch((error) => console.log(error));
      } catch (error) {
        console.log(error);
      }
    }
  }, [currenUser]);

  return (
    <>
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
                        height="75px"
                        key={idx}
                        src={`data:${file.type};base64,${file.content}`}
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
