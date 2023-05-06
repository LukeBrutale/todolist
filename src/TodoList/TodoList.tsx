import React, { useState, ChangeEvent, KeyboardEvent } from 'react'
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
  addTask: (title: string) => void,
}

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("")

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
  }

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 13) {
      props.addTask(newTaskTitle)
      setNewTaskTitle("")
    }
  }

  const addTask = () => {
     props.addTask(newTaskTitle)
          setNewTaskTitle("")
  }

  return (
    <div>
      <h3>{props.title}</h3>
      <div> 
        <input
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyUp={onKeyUpHandler}
          />
        <button onClick={addTask}>+</button>
      </div>
      <ul>
        {
          props.tasks.map(task =>
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.isDone}/>
              <span>
                {task.title}
              </span>
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