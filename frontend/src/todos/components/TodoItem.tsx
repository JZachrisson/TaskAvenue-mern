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
    maxWidth: '900px',
    minHeight: '100px',
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-between',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '15px',
    paddingLeft: '3px',
    paddingRight: '3px',
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
            maxLength={100}
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
      <ListItem button className={`${classes.listItem} ${checkTodo}`}>
        <div className="todo-item">
          <Checkbox
            style={{
              color: '#44bd32',
              transform: 'scale(1.3)',
            }}
            checked={todo.status}
            onChange={() => toggleCompletedTodo(todo._id)}
          />
          <div className="todo-item-text">
            <h4 className={checkTodo}>{todo.name}</h4>
            {todo.description ? (
              <p className={checkTodo}>{todo.description}</p>
            ) : (
              ''
            )}
          </div>
        </div>

        <div className="todo-item-info">
          <div style={{ position: 'absolute', right: '10px', top: '12px' }}>
            {todo.creator}
          </div>

          <Button
            style={{ padding: '0' }}
            color="primary"
            onClick={() => setOpen(true)}
            startIcon={
              <EditIcon
                style={{
                  position: 'absolute',
                  left: '55px',
                  padding: '0',
                  bottom: '-5px',
                  fontSize: '30px',
                  color: '#a75d8a',
                }}
              />
            }
          ></Button>
          <Button
            className="action-btn"
            style={{ padding: '0' }}
            color="secondary"
            onClick={() => deleteTodo(todo._id)}
            startIcon={
              <DeleteOutlineIcon
                style={{
                  position: 'absolute',
                  padding: '0',
                  bottom: '-5px',
                  fontSize: '30px',
                  color: '#a75d8a',
                }}
              />
            }
          ></Button>
        </div>
      </ListItem>
    </>
  );
};

export default TodoItem;
