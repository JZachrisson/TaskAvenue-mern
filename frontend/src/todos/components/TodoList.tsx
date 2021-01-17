/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useContext } from 'react';
import {
  addTodo,
  deleteTodo,
  toggleCompletedTodo,
  editTodo,
} from '../../services/API';
import TodoItem from './TodoItem';
import { AuthContext } from '../../shared/context/auth-context';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';
import { TextField, Button } from '@material-ui/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import './TodoList.css';
import { Formik, Form } from 'formik';

const baseUrl: string = 'https://taskavenue-backend.herokuapp.com/api/';

//const baseUrl: string = 'http://localhost:8080/api/';

interface Values {
  name: string;
  description: string;
}

const TodoList: React.FC = () => {
  const auth = useContext(AuthContext);
  const [listName, setListName] = useState('');
  const [copied, setCopied] = useState(false);
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState('');

  let { id }: any = useParams();

  const displayMessage = () => {
    setCopied(true);
    setMessage('URL copied to clipboard');
    setTimeout(function () {
      setMessage('');
    }, 3000);
  };

  const submitTodo = (values: Values) => {
    addTodo(values, auth.username, id);
  };

  useEffect(() => {
    axios.get(`${baseUrl}todolists/${id}`).then((response) => {
      setListName(response.data.list.name);
    });

    axios.get(`${baseUrl}todoitems/list/${id}`).then((response) => {
      setTodos(response.data.items);
    });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('2619df95f428203c4d5b', {
      cluster: 'eu',
    });

    const listChannel = pusher.subscribe('todolists');
    listChannel.bind('updated', function (data: any) {
      axios.get(`${baseUrl}todoitems/${data.itemId}`).then((response) => {
        setTodos([response.data.item, ...todos]);
      });
    });

    const itemsChannel = pusher.subscribe('todoitems');
    itemsChannel.bind('deleted', function (data: any) {
      console.log('DELETED');

      axios.get(`${baseUrl}todoitems/list/${id}`).then((response) => {
        setTodos(response.data.items);
      });
    });

    itemsChannel.bind('updated', function (data: any) {
      console.log('UPDATED');

      axios.get(`${baseUrl}todoitems/list/${id}`).then((response) => {
        setTodos(response.data.items);
      });
    });

    return () => {
      listChannel.unbind_all();
      listChannel.unsubscribe();
      itemsChannel.unbind_all();
      itemsChannel.unsubscribe();
    };
  }, [todos]);

  return (
    <div className="todolist-container">
      <div className="todolist-heading">
        <h1 className="listHeader">{listName}</h1>
      </div>
      <Formik
        initialValues={{ name: '', description: '' }}
        onSubmit={(values, { resetForm }) => {
          submitTodo(values);
          resetForm();
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div>
              <TextField
                inputProps={{ maxLength: 15 }}
                placeholder="Name"
                name="name"
                value={values.name}
                onChange={handleChange}
                required
                onBlur={handleBlur}
              />
            </div>
            <div>
              <TextField
                placeholder="Description (Optional)"
                inputProps={{ maxLength: 1000 }}
                name="description"
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <Button
              style={{
                marginTop: '12px',
                marginBottom: '40px',
                backgroundColor: '#792959',
              }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Add Item
            </Button>
          </Form>
        )}
      </Formik>
      <CopyToClipboard
        text={window.location.href}
        onCopy={() => displayMessage()}
      >
        <Button variant="contained" className="clipboard-btn">
          {' '}
          SHARE LIST
        </Button>
      </CopyToClipboard>

      {copied ? (
        <span style={{ display: 'block', marginTop: '10px', color: 'green' }}>
          {message}
        </span>
      ) : null}
      <ul className="todo-list">
        {todos.map((todo) => {
          return (
            <TodoItem
              key={todo._id}
              todo={todo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              toggleCompletedTodo={toggleCompletedTodo}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
