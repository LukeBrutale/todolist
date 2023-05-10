import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { FilterValuesType } from '../App';

export type TasksType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TasksType>;
  filter: FilterValuesType;
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string,
  ) => void;
  removeTodolist: (todolistId: string) => void;
};

export function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.keyCode === 13) {
      addTask();
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() === '') {
      return setError('Task is required');
    }
    props.addTask(newTaskTitle.trim(), props.id);
    setNewTaskTitle('');
  };

  const onAllClickHandler = () => props.changeFilter('all', props.id);
  const onActiveClickHandler = () => props.changeFilter('active', props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter('completed', props.id);
  const removeTodolist = () => props.removeTodolist(props.id);

  return (
    <div>
      <h3>
        {props.title} <button onClick={removeTodolist}>x</button>
      </h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyUp={onKeyUpHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className="error-message">{error}</div>}
      </div>
      <ul>
        {props.tasks.map(task => {
          const onRemoveHandler = () => props.removeTask(task.id, props.id);
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
          };

          return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
              <input
                type="checkbox"
                onChange={onChangeStatusHandler}
                checked={task.isDone}
              />
              <span>{task.title}</span>
              <button onClick={onRemoveHandler}>x</button>
            </li>
          );
        })}
      </ul>
      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}
        >
          Complited
        </button>
      </div>
    </div>
  );
}
