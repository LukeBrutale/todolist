import React, { useState } from 'react';
import { TodoList, TasksType } from './TodoList/TodoList';
import { AddItemForm } from './AddItemForm/AddItemForm';
import { v1 } from 'uuid';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import './App.css';

export type FilterValuesType = 'all' | 'completed' | 'active';
type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TaskStateType = {
  [id: string]: Array<TasksType>;
};

function App() {
  function removeTask(id: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let filteredTasks = tasks.filter(task => task.id !== id);
    tasksObj[todolistId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function changeFilter(value: FilterValuesType, todolistId: string) {
    let changedTodoList = todolists.find(todolist => todolist.id === todolistId);
    if (changedTodoList) {
      changedTodoList.filter = value;
      setTodolists([...todolists]);
    }
  }

  function addTask(title: string, todolistId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todolistId];
    let newTasks = [task, ...tasks];
    tasksObj[todolistId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let findStatusTask = tasks.find(task => task.id === taskId);
    if (findStatusTask) {
      findStatusTask.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  function changeTaskTitle(taskId: string, newValue: string, todolistId: string) {
    let tasks = tasksObj[todolistId];
    let findTitleTask = tasks.find(task => task.id === taskId);
    if (findTitleTask) {
      findTitleTask.title = newValue;
      setTasks({ ...tasksObj });
    }
  }

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [todolists, setTodolists] = useState<Array<TodolistType>>([
    { id: todolistId1, title: 'what', filter: 'all' },
    { id: todolistId2, title: 'nowhat', filter: 'all' },
  ]);

  function removeTodolist(todolistId: string) {
    let filteredTodolist = todolists.filter(tl => tl.id !== todolistId);
    setTodolists(filteredTodolist);
    delete tasksObj[todolistId];
    setTasks({ ...tasksObj });
  }

  function changeTodolistTitle(todolistId: string, newTitle: string) {
    let todolist = todolists.find(tl => tl.id === todolistId);
    if (todolist) {
      todolist.title = newTitle;
      setTodolists([...todolists]);
    }
  }

  let [tasksObj, setTasks] = useState<TaskStateType>({
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

  function addTodolist(title: string) {
    let todolist: TodolistType = {
      id: v1(),
      filter: 'all',
      title: title,
    };
    setTodolists([todolist, ...todolists]);
    setTasks({ ...tasksObj, [todolist.id]: [] });
  }

  return (
    <div>
      <AppBar position="sticky" className="header">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg">
        <Grid container style={{ padding: '10px 5px 20px 5px' }}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={5}>
          {todolists.map(todolist => {
            let tasksForTodoList = tasksObj[todolist.id];
            if (todolist.filter === 'completed') {
              tasksForTodoList = tasksForTodoList.filter(task => task.isDone === true);
            }
            if (todolist.filter === 'active') {
              tasksForTodoList = tasksForTodoList.filter(task => task.isDone === false);
            }
            return (
              <Grid item>
                <Paper style={{ backgroundColor: '#cdd1d1', padding: '10px' }}>
                  <TodoList
                    key={todolist.id}
                    id={todolist.id}
                    title={todolist.title}
                    tasks={tasksForTodoList}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    addTask={addTask}
                    changeTaskStatus={changeStatus}
                    changeTaskTitle={changeTaskTitle}
                    filter={todolist.filter}
                    removeTodolist={removeTodolist}
                    changeTodolistTitle={changeTodolistTitle}
                  />
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
