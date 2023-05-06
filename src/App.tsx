import React, {useState} from 'react';
import './App.css';
import { TasksType, TodoList } from './TodoList/TodoList'
import { v1 } from 'uuid';


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


// let tasks2: Array<TasksType> = [
//   { id: 1, title: "Аватар: Шлях води", isDone: true },
//   { id: 2, title: "Крик VI", isDone: false },
//   { id: 3, title: "Людина-мураха та Оса: Квантоманія", isDone: true },
//   { id: 4, title: "Джон Уік 4", isDone: false },
//   { id: 5, title: "XXX", isDone: false},
// ]

// let tasks3: Array<TasksType> = [
//   { id: 1, title: "Lindja - Petrichor", isDone: false },
//   { id: 2, title: "aericsn - Regrets", isDone: false },
//   { id: 3, title: "Nora Van Elken - Love Without You (P.A.V Remix)", isDone: false },
//   { id: 4, title: "Eneko Artola, Eirik Næss - In the Arms", isDone: false },
//   { id: 5, title: "5'NIZZA - САМОЛЁТ", isDone: true },
//   { id: 6, title: "5’nizza- Але", isDone: true},
// ]

function removeTask(id: string) {
  let filteredTasks = tasks.filter(task => task.id !== id)
  setTasks(filteredTasks)
}
  
function changeFilter(value: FilterValuesType) {
  setFilter(value)
}
  
  function addTask() {
    let newTask = { id: v1(), title: "New Task", isDone: false }
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
      {/* <TodoList title="Movies" tasks={ tasks2}/> */}
      {/* <TodoList title="Music" tasks={ tasks3}/> */}
    </div>
  );
}



export default App;
