import React, { useState,useRef } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import "./App.css";

function App() {
  const [todo, setTodo] = useState({ description: '', date: '', priority: '' });
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  }

  const addTodo = (event) => {
    const newTodo = { ...todo, id: Date.now() }; 
    event.preventDefault();
    setTodos([...todos, newTodo]);
    if (todo.description.trim() === '' && todo.priority.trim() === '' && todo.date.trim() === '') {
      alert('Please fill in at least one field.');
      return; // Prevent adding a blank todo
    }
  }
  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) {
      setTodos(todos.filter((todo, index) =>
        index != gridRef.current.getSelectedNodes()[0].id))
  }
  else {
      alert('Select row first');
    }
  };

  const columns = [
    { headerName: 'Date', field: 'date',sortable: true, filter: true, floatingFilter: true },
    { headerName: 'Description', field: 'description',sortable: true, filter: true, floatingFilter: true },
    { headerName: 'Priority', field: 'priority' ,sortable: true, filter: true, floatingFilter: true,cellStyle: params => params.value === "High"|| params.value === "high" ? {color: 'red'} : {color: 'black'}},
  ]

  return (
    <div className="App">
      <h1>TodoList</h1>
      <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.Description} />
      <input type="date" onChange={inputChanged} placeholder="Date" name="date" value={todo.Date} />
      <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.Priority} />
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>

      <div
        className="ag-theme-material"
        style={{
          height: '800px',
          width: '50%',
          margin: 'auto'
        }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={ params => gridRef.current = params.api }
          rowSelection="single"
          columnDefs={columns}
          rowData={todos}
        >
        </AgGridReact>
      </div>
    </div>
  );
}

export default App;
