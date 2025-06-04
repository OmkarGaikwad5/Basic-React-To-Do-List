import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function Todo() {
  const [todos, setTodos] = useState([{ task: "Sample Todo", id: uuidv4(), isDone: false }]);
  const [newTodo, setNewTodo] = useState("");

  const saveToDo = () => {
    if (newTodo.trim() === "") return;
    setTodos((prev) => [...prev, { task: newTodo.trim(), id: uuidv4(), isDone: false }]);
    setNewTodo("");
  };

  const updateToDo = (e) => setNewTodo(e.target.value);

  const deleteTodo = (id) => setTodos(todos.filter((todo) => todo.id !== id));

  const markAsDone = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo
      )
    );
  };

  const markAllDone = () => {
    setTodos(todos.map((todo) => ({ ...todo, isDone: true })));
  };

  return (
    <div className="todo-container">
      <div className="todo-input">
        <input
          type="text"
          onChange={updateToDo}
          value={newTodo}
          placeholder="Enter your task"
        />
        <button onClick={saveToDo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.isDone ? "done" : ""}>
            <span>{todo.task}</span>
            <div className="todo-actions">
              <button onClick={() => deleteTodo(todo.id)} className="delete">🗑️</button>
              {!todo.isDone && (
                <button onClick={() => markAsDone(todo.id)} className="mark">✅</button>
              )}
            </div>
          </li>
        ))}
      </ul>

      <button className="mark-all" onClick={markAllDone}>
        Mark All as Done
      </button>
    </div>
  );
}
