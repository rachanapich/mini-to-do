import React from 'react';
import ToDoList from './components/ToDoList';
import './App.css'; 
const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Welcome to your Mini Todo App</h1>
      <ToDoList />
    </div>
  );
};

export default App;
