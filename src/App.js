import React, { useState } from "react";
import TodoTable from "./components/TodoTable";

function App() {
  const [todo, setTodo] = useState({ description: "", date: "" });
  const [todos, setTodos] = useState([]);

  const handleClick = () => {
    if (todo.description && todo.date) {
      setTodos([...todos, todo]);
      setTodo({ description: "", date: "" });
    }
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  return (
    <div className="App">
      <h3>My Todos</h3>
      <input
        placeholder="Description"
        value={todo.description}
        onChange={(e) =>
          setTodo({ ...todo, description: e.target.value })
        }
      />

      <input
        type="date"
        value={todo.date}
        onChange={(e) => setTodo({ ...todo, date: e.target.value })}
      />
      <button onClick={handleClick}>Add Todo</button>

      <TodoTable todos={todos} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
