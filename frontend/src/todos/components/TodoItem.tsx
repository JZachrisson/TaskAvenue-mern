import React, { useState } from 'react';
import { deleteTodo, toggleCompletedTodo, editTodo } from '../../services/API';
import Modal from '@material-ui/core/Modal';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import EditIcon from '@material-ui/icons/Edit';
import Checkbox from '@material-ui/core/Checkbox';
import { makeStyles } from '@material-ui/core/styles';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import './TodoItem.css';

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 350,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 4),
  },
  listItem: {
    width: '100%',
    maxWidth: 900,
    display: 'flex',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '15px',
    paddingLeft: '15px',
    paddingRight: '15px',
    paddingTop: '25px',
    paddingBottom: '10px',
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.paper,
  },
}));

type Props = TodoProps & {
  deleteTodo: (_id: string) => void;
  toggleCompletedTodo: (_id: string) => void;
  editTodo: (_id: string, name: string, description: string) => void;
};

const TodoItem: React.FC<Props> = ({ todo }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(todo.name);
  const [description, setDescription] = useState(todo.description);

  const checkTodo: string = todo.status ? `line-through` : '';

  return (
    <>
      <Modal
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className={classes.paper}>
          <h4>Edit Item</h4>
          <input
            maxLength={15}
            value={name}
            style={{ marginBottom: '10px' }}
            placeholder={todo.name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            maxLength={15}
            value={description}
            placeholder={todo.description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button
            variant="contained"
            style={{
              backgroundColor: '#792959',
              color: 'white',
              marginTop: '10px',
              display: 'block',
            }}
            onClick={() => {
              editTodo(todo._id, name, description);
              setOpen(false);
            }}
          >
            Submit
          </Button>
        </div>
      </Modal>
      <ListItem button className={classes.listItem}>
        <div className="todo-item">
          <Checkbox
            style={{ color: 'green', transform: 'scale(1.5)' }}
            checked={todo.status}
            onChange={() => toggleCompletedTodo(todo._id)}
          />
          <div>
            <div className="todo-item-text">
              <h5 className={checkTodo}>{todo.name}</h5>
              {todo.description ? (
                <p className={checkTodo}>{todo.description}</p>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>

        <div className="todo-item-info">
          <div style={{ display: 'inline-block', marginRight: '15px' }}>
            {todo.creator}
          </div>

          <Button
            color="primary"
            onClick={() => setOpen(true)}
            startIcon={
              <EditIcon style={{ fontSize: '30px', color: '#a75d8a' }} />
            }
          ></Button>
          <Button
            color="secondary"
            onClick={() => deleteTodo(todo._id)}
            startIcon={
              <DeleteOutlineIcon
                style={{ fontSize: '30px', color: '#a75d8a' }}
              />
            }
          ></Button>
        </div>
      </ListItem>
    </>
  );
};

export default TodoItem;
