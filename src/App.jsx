import React, { useState } from "react";
import "./styles.scss";

export const App = () => {
  const [todoText, setTodoText] = useState("");
  const [progressTodos, setProgressTodos] = useState([]);
  const [completeTodos, setCompleteTodos] = useState([]);
  const onChangeTodoText = (event) => {
    setTodoText(event.target.value);
  };

  const onClickAdd = (event) => {
    if (todoText === "") return;
    const newTodos = [...progressTodos, todoText];
    setProgressTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...progressTodos];
    newTodos.splice(index, 1);
    setProgressTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newProgressTodos = [...progressTodos];
    newProgressTodos.splice(index, 1);

    const newCompleteTodos = [...completeTodos, progressTodos[index]];
    setCompleteTodos(newCompleteTodos);

    setProgressTodos(newProgressTodos);
  };

  const onClickBack = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    const newProgressTodos = [...progressTodos, completeTodos[index]];
    setProgressTodos(newProgressTodos);
    setCompleteTodos(newCompleteTodos);
  };

  return (
    <>
      <div className="input-area">
        <input
          placeholder="TODOを入力"
          value={todoText}
          onChange={onChangeTodoText}
        />
        <button onClick={onClickAdd}>追加</button>
      </div>
      <div className="progress-area">
        <h2>未完了のTODO</h2>
        <ul id="progress-list">
          {progressTodos.map((todo, index) => {
            return (
              <li key={todo} className="todo-item">
                <div className="todo-title">{todo}</div>
                <button onClick={() => onClickComplete(index)}>完了</button>
                <button onClick={() => onClickDelete(index)}>削除</button>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="complete-area">
        <h2>完了済みのTODO</h2>
        <ul id="complete-list">
          {completeTodos.map((todo, index) => {
            return (
              <li key={todo} className="todo-item">
                <div className="todo-title">{todo}</div>
                <button onClick={() => onClickBack(index)}>戻る</button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};
