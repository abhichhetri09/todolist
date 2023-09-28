import React from "react";

function TodoTable({ todos, handleDelete }) {
  return (
    <ul>
      {todos.map((item, index) => (
        <li key={index}>
          Description: {item.description}, Date: {item.date}
          <button onClick={() => handleDelete(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoTable;
