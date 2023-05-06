import React, {useState} from 'react';
import { TasksType, TodoList } from './TodoList/TodoList'
import { v1 } from 'uuid';

import './App.css';


export type FilterValuesType = "all" | "completed" | "active";



function App() {
  let initTasks: Array<TasksType> = [
  { id: v1(), title: "HTML", isDone: true },
  { id: v1(), title: "CSS", isDone: true },
  { id: v1(), title: "JavaSript", isDone: true },
  { id: v1(), title: "React", isDone: false},
]

  let [tasks, setTasks] = useState(initTasks);
  let [filter, setFilter] = useState<FilterValuesType>('all')



function removeTask(id: string) {
  let filteredTasks = tasks.filter(task => task.id !== id)
  setTasks(filteredTasks)
}
  
function changeFilter(value: FilterValuesType) {
  setFilter(value)
}
  
  function addTask(title: string) {
    let newTask = { id: v1(), title: title, isDone: false }
    let newTasks = [newTask, ...tasks]
    setTasks(newTasks)
}
  
  let tasksForTodoList = tasks;
  if (filter === "completed") {
    tasksForTodoList = tasks.filter(task => task.isDone === true)
  }
  if (filter === "active") {
    tasksForTodoList = tasks.filter(task => task.isDone === false)
  }
  
  return (
    <div className="App">
      <TodoList
        title="Books"
        tasks={tasksForTodoList}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={ addTask} />
    </div>
  );
}



export default App;
