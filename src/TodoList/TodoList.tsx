import React from 'react'

export type TasksType = {
  id: number,
  title: string,
  isDone: boolean,
}

type PropsType = {
  title: string,
  tasks: Array<TasksType>,
  removeTask: (id: number) => void,
  changeFilter: (value: FilterValuesType) => void,
}

export function TodoList(props: PropsType) {
  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input type="text" />
        <button>+</button>
      </div>
      <ul>
        {
          props.tasks.map(task => <li><input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
          <button onClick={()=>{props.removeTask(task.id)}}>x</button></li>)
        }
      </ul>
        <div>
        <button onClick={()=>{props.changeFilter("all")}}>All</button>
        <button onClick={()=>{props.changeFilter("active")}}>Active</button>
        <button onClick={()=>{props.changeFilter("completed")}}>Complited</button>
      </div>
    </div>
  )
}