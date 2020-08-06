import React, { useState, useContext } from 'react'
// UC3: Импортируем тот же контекст, что и в App.js
import { Context } from './context'

export default function TodoItem({title, id, completed}) {
  // UC4: метод useContext ищет ближайшего провайдера контекста, или компонент <Context.Provider> и берет у него значения из поля value. Мы же, через оператор развертывания, зная что в value выше передавали две функции - цепляем их, или если удобно ссылки на них.
  const { dispatch } = useContext(Context);

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
          // UCR3: И теперь уже можем смело скаказть, что вот такую функцию мне исполнить. С каменным ебалом. Как будто эта функция лежит прямо в текущем файле, или где-то в другом файле экспортированная. Но сок в том, что мы ее объявили ВООБЩЕ в другом отдельном файле с логикой. Там, где мы объявили по сути свитчер стоит, который в зависимости от действия обновляет состояние.
          onChange={() => dispatch({type: 'toggle', payload: id})}
        />
        <span>{title}</span>

        <i
          onClick={() => dispatch({type: 'remove', payload: id})}
          className="material-icons red-text"
        >
          delete
        </i>
      </label>
    </li>
  )
}