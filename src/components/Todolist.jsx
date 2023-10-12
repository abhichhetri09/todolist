import React, { useState, useRef } from "react";
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';

function Todolist() {
  const [todo, setTodo] = useState({ date: '', description: '', priority: '' });
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('one');
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDateChange = (date) => {
    setTodo({ ...todo, date: date.toISOString() });
  };

  const addTodo = (event) => {
    event.preventDefault();
    if (!todo.date || !todo.description || !todo.priority) {
      alert('Please fill in all fields.');
      return;
    }
    const newTodo = { ...todo, id: Date.now() };
    setTodos([...todos, newTodo]);
  };
  const handleDelete = () => {
    const selectedNodes = gridRef.current.getSelectedNodes();
    if (selectedNodes.length > 0) {
      const selectedId = selectedNodes[0].data.id;
      setTodos(todos.filter(todo => todo.id !== selectedId));
    } else {
      alert('Please select a row first.');
    }
  };


  const columns = [
    { headerName: 'Date', field: 'date', sortable: true, filter: true, floatingFilter: true, valueFormatter: (params) => {
      return new Date(params.value).toLocaleDateString();
    }, },
    { headerName: 'Description', field: 'description', sortable: true, filter: true, floatingFilter: true },
    {
      headerName: 'Priority',
      field: 'priority',
      sortable: true,
      filter: true,
      floatingFilter: true,
      cellStyle: (params) =>
        params.value === 'High' || params.value === 'high' ? { color: 'red' } : { color: 'black' },
    },
  ];
  const gridOptions = {
    animateRows: true, // Enable row animation
    getRowNodeId: data => data.id, // Provide a unique key for each row
  };

  return (
    <>
   
      <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            value={todo.date}
            onChange={handleDateChange}
            renderInput={(params) => (
              <TextField {...params} label="Date" variant="standard" />
            )}format="YYYY/MM/DD"
          />
        </LocalizationProvider>
        <TextField label="Description" variant="standard" name="description" value={todo.description} onChange={inputChanged} />
        <TextField label="Priority" variant="standard" name="priority" value={todo.priority} onChange={inputChanged} />
        <Button onClick={addTodo} variant="contained">
          Add
        </Button>
        <Button onClick={handleDelete} variant="contained" color="error">
          Delete
        </Button>
      </Stack>
      <div className="ag-theme-material" style={{ height: '800px', width: '50%', margin: 'auto' }}>
        <AgGridReact
          ref={gridRef}
          onGridReady={(params) => (gridRef.current = params.api)}
          rowSelection="single"
          columnDefs={columns}
          rowData={todos}
          gridOptions={gridOptions}
        />
      </div>
    </>
  );
}

export default Todolist;
