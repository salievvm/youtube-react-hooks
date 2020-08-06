import React, { useState, useEffect, useReducer } from 'react'
import TodoList from './TodoList'
// UC: Импортируем контекст
import { Context } from './context'
// UR0: Импортируем Reducer
import reducer from './reducer'

export default function App() {
  // UR1: Говорим что есть некий стейт, и метод его обновления диспатч
  const [state, dispatch] = useReducer(reducer, JSON.parse(localStorage.getItem('todos')))
  const [todoTitle, setTodoTitle] = useState('');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state))
  }, [state]);

  // ^ 1. Если был передан пустой массив [] вторым аргументом метода useEffect - то эмулируется метод componentDidMount, который вызывается тогда, когда компонент уже был смонтирован, и загружен в ДОМ
  // ^ 2. Если был передан стейт todos, который заполняется методом useState, то при каждом вызове setTodos, и изменении состояния переменной todos - будет срабатывать callback, который мы передали первым аргументом в метод useEffect

  const addTodo = event => {
    if (event.key === 'Enter') {
      dispatch({
        type: 'add',
        payload: todoTitle
      })
      setTodoTitle('')
    }
  }

  return (
    <Context.Provider value={{
      // UR2: Передаем dispatch (ссылку на метод) вниз через провайдер контекста (проводник контекста), который их передаст дальше, кому они нужнее, со всеми аргументами
      dispatch
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

          <TodoList todos={state} />
      </div>
    </Context.Provider>
  );
}