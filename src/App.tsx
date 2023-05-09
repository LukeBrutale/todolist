import React, { useState } from 'react';
import { TasksType, TodoList } from './TodoList/TodoList';
import { v1 } from 'uuid';

import './App.css';

export type FilterValuesType = 'all' | 'completed' | 'active';
type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(task => task.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let changedTodoList = todolists.find(
      todolist => todolist.id === todolistId,
    );
    if (changedTodoList) {
      changedTodoList.filter = value;
      setTodolists([...todolists]);
    }
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTask;

    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let findStatusTask = tasks.find(task => task.id === taskId);
    if (findStatusTask) {
      findStatusTask.isDone = isDone;
      // tasksObj[todolistId] = [...tasksObj];
      setTasks({ ...tasksObj });
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'what', filter: 'active' },
    {
      id: todolistId2,
      title: 'nowhat',
      filter: 'completed',
    },
  ]);

  let [tasksObj, setTasks] = useState({
    [todolistId1]: [
      { id: v1(), title: 'HTML', isDone: true },
      { id: v1(), title: 'CSS', isDone: true },
      { id: v1(), title: 'JavaSript', isDone: true },
      { id: v1(), title: 'React', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Promo', isDone: true },
      { id: v1(), title: 'Qwerty', isDone: true },
    ],
  });

  return (
    <div className="App">
      {todolists.map(todolist => {
        let tasksForTodoList = tasks[todolist.id];
        if (todolist.filter === 'completed') {
          tasksForTodoList = tasksForTodoList.filter(
            task => task.isDone === true,
          );
        }
        if (todolist.filter === 'active') {
          tasksForTodoList = tasksForTodoList.filter(
            task => task.isDone === false,
          );
        }
        return (
          <TodoList
            key={todolist.id}
            id={todolist.id}
            title={todolist.title}
            tasks={tasksForTodoList}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={todolist.filter}
          />
        );
      })}
    </div>
  );
}

export default App;
