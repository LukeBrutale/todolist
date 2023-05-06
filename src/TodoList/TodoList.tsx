import React, { useState } from 'react'
import { FilterValuesType } from '../App'

export type TasksType = {
  id: string,
  title: string,
  isDone: boolean,
}

type PropsType = {
  title: string,
  tasks: Array<TasksType>,
  removeTask: (id: string) => void,
  changeFilter: (value: FilterValuesType) => void,
  addTask: () => void,
}

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("")

  return (
    <div>
      <h3>{props.title}</h3>
      <div> 
        <input value={newTaskTitle} onChange={()=>{setNewTaskTitle('123')}}/>
        <button onClick={() => {props.addTask()}}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(task => <li key={task.id}><input type="checkbox" checked={task.isDone}/><span>{task.title}</span>
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