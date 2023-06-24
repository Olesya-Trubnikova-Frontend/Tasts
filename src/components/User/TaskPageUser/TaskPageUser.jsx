import "./TaskPageUser.css";
import { MainMenuUser } from "../MainMenuUser/MainMenuUser";
import { TaskAddForm } from "./TaskAddForm/TaskAddForm";
import { TaskTableView } from "./TaskTableView/TaskTableView";

export const TaskPageUser = () => {
  return (
    <div className="user-task-page">
      <MainMenuUser />
      <div className="user-task-page__body">
        <div className="user-task-page__containre">
          <TaskAddForm />
          <TaskTableView />
        </div>
      </div>
    </div>
  );
};
