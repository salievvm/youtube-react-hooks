import React, { useState, useContext } from 'react'
// UC3: Импортируем тот же контекст, что и в App.js
import { Context } from './context'

export default function TodoItem({title, id, completed}) {
  // UC4: метод useContext ищет ближайшего провайдера контекста, или компонент <Context.Provider> и берет у него значения из поля value. Мы же, через оператор развертывания, зная что в value выше передавали две функции - цепляем их, или если удобно ссылки на них.
  const { toggleTodo, removeTodo } = useContext(Context);

  const cls = ['todo'];

  if (completed) {
    cls.push('completed');
  }
  return (
    <li className={cls.join(' ')}>
      <label>
        <input
          type="checkbox"
          checked={completed}
          // UC5: И теперь уже можем смело скаказть, что вот такую функцию мне исполни. С каменным ебалом. Как будто эта функция лежит прямо в текущем файле, или где-то в другом файле экспортированная. Но сок в том, что мы ее объявили ВНУТРИ родительского компонента. Там, где мы объявили стейт, и можем его изменить. А значит мы уходим от пропсов и обработчиков функций через бесконечную вложенность компонентов, за нас это делает Провайдер.
          onChange={() => toggleTodo(id)}
        />
        <span>{title}</span>

        <i
          onClick={() => removeTodo(id)}
          className="material-icons red-text"
        >
          delete
        </i>
      </label>
    </li>
  )
}