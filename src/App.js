import React, { useState, useEffect } from 'react'
import TodoList from './TodoList'
// UC: Импортируем контекст
import { Context } from './context'

export default function App() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');

  const handleClick = () => console.log('click');

  useEffect(() => {
    const raw = localStorage.getItem('todos') || [];
    setTodos(JSON.parse(raw)); 
  }, []);

  // ^ 1. Если был передан пустой массив [] вторым аргументом метода useEffect - то эмулируется метод componentDidMount, который вызывается тогда, когда компонент уже был смонтирован, и загружен в ДОМ

  useEffect(() => {
    // устанавливаем слушатель, который отслеживает клик мышки. Он будет писать в консоль каждое событие мыши, умноженное на количество элементов массива todos. Потому что useEffect был вызван дважды: 1й раз когда он был пустой, и второй раз когда мы достали массив из локального хранилища. Это называется утечка памяти. Мы на каждый элемент массива повесили слушатель.
    document.addEventListener('click', handleClick);
    localStorage.setItem('todos', JSON.stringify(todos))
    return () => {
      // чтобы этого не происходило, нам нужно отменить регистрацию слушателя на клик мышки, вернув колбэк у useEffetct, тогда событие будет регистрироваться один раз
      document.removeEventListener('click', handleClick)
    }
  }, [todos]);

  // ^ 2. Если был передан стейт todos, который заполняется методом useState, то при каждом вызове setTodos, и изменении состояния переменной todos - будет срабатывать callback, который мы передали первым аргументом в метод useEffect

  const addTodo = event => {
    if (event.key === 'Enter') {
       setTodos([
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

  // UC1: Добавляем две функции, которые будут работать в дочерних компонентах
  const removeTodo = id => {
    setTodos(todos.filter(todo => {
      return todo.id !== id
    }))
  }

  const toggleTodo = id => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        todo.completed = !todo.completed;
      }
      return todo;
    }))
  }

  return (
    <Context.Provider value={{
      // UC2: Передаем эти функции (ссылки на функции) вниз через провайдер контекста (проводник контекста), который их передаст дальше, кому они нужнее, со всеми аргументами
      toggleTodo, removeTodo
    }}>
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
    </Context.Provider>
  );
}