import React, { useState } from "react";

function Todolist(){
const [todo, setTodo] = React.useState({description: '', date: ''});
const [todos, setTodos] = useState([]);

const handleClick = () => {
setTodos([...todos, todo]);
setTodo({description: '', date: ''});
}
const handleDelete = (index) => {
    // Use filter to remove the to-do item at the specified index
    setTodos(todos.filter((_, i) => i !== index));
  };

    return(
        <>
        <h3>My Todos</h3>
        <input 
            placeholder="Description"
            value = {todo.description}
            onChange={e => setTodo({...todo, description: e.target.value})}
        />

        <input 
            type='date'
            value= {todo.date}
            onChange={e => setTodo({...todo, date: e.target.value})}
        />
        <button onClick={handleClick}>Add Todo</button>
        <ul>
        {todos.map((item, index) => (
          <li key={index}>
            Description: {item.description}, Date: {item.date}
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
        </>
    );
}

export default Todolist;