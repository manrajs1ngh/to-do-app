import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

const Todo = ({ todo, toggleComplete, deleteTodo }) => {
  return (
    <li className={todo.completed ? "li__complete" : "li"}>
      <input onChange={() => toggleComplete(todo)} type="checkbox" className="checkbox" checked={todo.completed ? 'checked' : ''}/>
      <p>{todo.text}</p>
      <button onClick={deleteTodo} className="todo__remove btn">
        <FontAwesomeIcon icon={faTrashCan} />
      </button>
    </li>
  );
};

export default Todo;
