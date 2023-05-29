import React, { useState, ChangeEvent, KeyboardEvent } from 'react';

type AddItemFormPropsType = {
  addItem: (title: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {
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
    props.addItem(newTaskTitle.trim());
    setNewTaskTitle('');
  };

  return (
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
  );
}
