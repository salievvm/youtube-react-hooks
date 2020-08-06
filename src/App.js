import React, { useState } from 'react'
import TodoList from './TodoList'

export default function App() {
  const [todos, setTodods] = useState([
    {id: 1, title: 'First todo', completed: false},
    {id: 2, title: 'Second todo', completed: true},
  ]);

  const [todoTitle, setTodoTitle] = useState('');

  const addTodo = event => {
    if (event.key === 'Enter') {
       setTodods([
         ...todos,
         {
           id: Date.now(),
           title: todoTitle,
           completed: false
         }
       ]);
       setTodoTitle('')
    }
  }

  return (
    <div className="container">
      <h1>Todo app</h1>

        <div className="input-field">
          <input type="text" 
            onChange={event => setTodoTitle(event.target.value)}
            value={todoTitle}
            onKeyPress={addTodo} />
          <label>Todo name</label>
        </div>

        <TodoList todos={todos} />
    </div>
  );
}