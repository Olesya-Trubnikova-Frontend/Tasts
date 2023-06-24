export const TextDataField = (props) => {
  const { getData } = props;

  const handelGetData = (e) => {
    getData(e)
  }

  return (
    <>
      <textarea
        className="form-input__task"
        type="text"
        name="task_descript"
        placeholder="Описание задачи..."
        onChange={handelGetData}
      ></textarea>
      <label>
        Срочно
        <input
          className="form__input"
          type="checkbox"
          name="task_priority"
          onChange={handelGetData}
        ></input>
      </label>
      <label>
        Выполнить до:
        <input
          className="form__input"
          type="date"
          name="deadline"
          onChange={handelGetData}
          min={new Date().toISOString().split("T")[0]}
        ></input>
      </label>
      <textarea
        className="form__comment"
        type="text"
        placeholder="Комментарий..."
        name="task_comment"
        onChange={handelGetData}
      ></textarea>
    </>
  );
};
