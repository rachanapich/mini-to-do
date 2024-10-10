import React, { useEffect, useState } from 'react';
import { subscribeToTodos, updateTodo, deleteTodo } from '../firestoreService';
import { ToDoItem } from '../types';
import ToDoForm from './ToDoForm';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create'; 
import './ToDoList.css'; 

const ToDoList: React.FC = () => {
  const [todos, setTodos] = useState<ToDoItem[]>([]);
  const [editingTodo, setEditingTodo] = useState<ToDoItem | null>(null);

  useEffect(() => {
    const unsubscribe = subscribeToTodos((fetchedTodos) => {
      setTodos(fetchedTodos);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTodo = (newTodo: ToDoItem) => {
    setTodos((prevTodos) => [newTodo, ...prevTodos]);
  };

  const handleUpdateTodo = async (id: string, updatedFields: Partial<ToDoItem>) => {
    await updateTodo(id, updatedFields);
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, ...updatedFields } : todo
      )
    );
    setEditingTodo(null);
  };

  const handleToggleStatus = async (id: string, currentStatus: 'completed' | 'incomplete') => {
    const newStatus = currentStatus === 'completed' ? 'incomplete' : 'completed';
    await handleUpdateTodo(id, { status: newStatus });
  };

  const handleDeleteTodo = async (id: string) => {
    await deleteTodo(id);
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const renderEditForm = (todo: ToDoItem) => (
    <form
      className="todo-list edit-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleUpdateTodo(todo.id, {
          title: (e.target as any).title.value,
          description: (e.target as any).description.value,
        });
      }}
    >
      <label>
        Title:
        <input type="text" name="title" defaultValue={todo.title} required />
      </label>
      <label>
        Description:
        <input type="text" name="description" defaultValue={todo.description} />
      </label>
      <button type="submit" className="save-btn">Save</button>
      <button type="button" className="cancel-btn" onClick={() => setEditingTodo(null)}>Cancel</button>
    </form>
  );

  return (
    <div className="todo-list-container">
      <ToDoForm onAddTodo={handleAddTodo} />

      <ul className="todo-list">
        {todos.length === 0 ? (
          <p>No ToDos found.</p>
        ) : (
          todos.map(todo => (
            <li key={todo.id}>
              {editingTodo?.id === todo.id ? (
                renderEditForm(todo)
              ) : (
                <>
                  <div className="content">
                    <h3>{todo.title}</h3>
                    <p>{todo.description}</p>
                    <p className={`status-text ${todo.status === 'completed' ? 'completed' : 'incomplete'}`}>
                      Status: {todo.status === 'completed' ? 'Completed' : 'Incomplete'}
                    </p>
                  </div>
                  <div className="button-container">
                    <button
                      className="status-btn"
                      onClick={() => handleToggleStatus(todo.id, todo.status)}
                    >
                      {todo.status === 'completed' ? 'Mark as Incomplete' : 'Mark as Completed'}
                    </button>

                    <button
                      className="edit-btn"
                      onClick={() => setEditingTodo(todo)}
                    >
                      <CreateIcon /> 
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteTodo(todo.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>

    </div>
  );
};

export default ToDoList;
