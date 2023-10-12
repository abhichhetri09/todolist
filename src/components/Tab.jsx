import React, { useState } from 'react';
import Todolist from './Todolist';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function TabApp()
 {
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [value, setValue] = useState('one');
  return (   <div>
    <Tabs value={value} onChange={handleChange}>
      <Tab value="one" label="Home" />
      <Tab value="two" label="Todos" />
    </Tabs>
    {value === 'one' && <div><h1>Welcome!</h1></div>}
    {value === 'two' && <Todolist />}

  </div>);
}
export default TabApp;