import React from 'react';
import './App.css';
import { TasksType, TodoList } from './TodoList/TodoList'

let tasks1: Array<TasksType> = [
  { id: 1, title: "HTML", isDone: true },
  { id: 2, title: "CSS", isDone: true },
  { id: 3, title: "JavaSript", isDone: true },
  { id: 4, title: "React", isDone: false},
]

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

function removeTask(id: number) {
  tasks1 = tasks1.filter(task => task.id !== id )
}


function App() {
  return (
    <div className="App">
      <TodoList title="Books" tasks={tasks1} removeTask={ removeTask} />
      {/* <TodoList title="Movies" tasks={ tasks2}/> */}
      {/* <TodoList title="Music" tasks={ tasks3}/> */}
    </div>
  );
}



export default App;
