import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import "./App.css";
import { db } from "./firebase";
import {
  collection,
  query,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";

function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");

  // Create a new todo
  const addTodo = async (e) => {
    e.preventDefault(); // Prevent the page from refreshing
    if (inputValue.trim() === "") {
      alert("Please enter a task.");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: inputValue,
      completed: false,
    });
    setInputValue(" ");
  };

  // Read the input value from Firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  // Update the todos in Firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  // Delete a todo
  const deleteTodo = async (todo) => {
    if (todo && todo.id) {
      await deleteDoc(doc(db, "todos", todo.id));
    } else {
      console.error("Todo or todo.id is undefined");
    }
  };

  return (
    <>
      <div className="background">
        <div className="container">
          <h1 className="heading">To Do App</h1>
          <div className="form__container">
            <form onSubmit={addTodo} className="form">
              <input
                type="text"
                className="form__input"
                placeholder="Add to do"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button className="form__btn btn">
                <FontAwesomeIcon icon={faPlus} />
              </button>
            </form>
          </div>
          <ul>
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                toggleComplete={() => toggleComplete(todo)}
                deleteTodo={() => deleteTodo(todo)}
              />
            ))}
          </ul>

          <p>{`You have ${todos.length} remaining tasks.`}</p>
        </div>
      </div>
    </>
  );
}

export default App;
