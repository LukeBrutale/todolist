import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import { TextField } from '@mui/material';

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
      <TextField
        id="standard-basic"
        label="Type value"
        variant="standard"
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyUp={onKeyUpHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask} color="primary">
        <AddIcon />
      </IconButton>
    </div>
  );
}
