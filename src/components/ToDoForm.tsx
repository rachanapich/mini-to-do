import React, { useState } from 'react';
import { addTodo } from '../firestoreService';
import { NewToDoItem, ToDoItem } from '../types';
import './ToDoList.css';

const ToDoForm: React.FC<{ onAddTodo: (todo: ToDoItem) => void }> = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<'completed' | 'incomplete'>('incomplete');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTodo: NewToDoItem = {
      title,
      description,
      status,
    };

    const addedTodo = await addTodo(newTodo);

    onAddTodo(addedTodo);

    setTitle('');
    setDescription('');
    setStatus('incomplete');
  };

  return (
    <form className="todo-list edit-form" onSubmit={handleSubmit}>
      <h2>Add ToDo</h2>
      <label>
        Title:
        <input 
          type="text" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required 
        />
      </label>
      <label>
        Description:
        <input 
          type="text" 
          value={description} 
          onChange={e => setDescription(e.target.value)} 
        />
      </label>
      <label>
        Status:
        <select 
          value={status} 
          onChange={e => setStatus(e.target.value as 'completed' | 'incomplete')}
        >
          <option value="incomplete">Incomplete</option>
          <option value="completed">Completed</option>
        </select>
      </label>
      <button type="submit" className="save-btn" style={{ border: 'none' }}>Add ToDo</button>
    </form>
  );
};

export default ToDoForm;
