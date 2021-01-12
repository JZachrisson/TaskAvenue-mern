/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { addTodo } from '../../services/API';
import TodoItem from './TodoItem';
import AuthService from '../../services/auth-service';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';
import axios from 'axios';
import './TodoList.css';

const TodoList = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [listName, setListName] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [todos, setTodos] = useState([]);

  let { id } = useParams<{ id: string }>();

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(name, description, currentUser.username, id);
    setName('');
    setDescription('');
  };

  useEffect(() => {
    axios.get(`http://localhost:8080/api/todolists/${id}`).then((response) => {
      setListName(response.data.list.name);
    });

    axios
      .get(`http://localhost:8080/api/todoitems/list/${id}`)
      .then((response) => {
        setTodos(response.data.items);
      });
  }, []);

  useEffect(() => {
    const pusher = new Pusher('2619df95f428203c4d5b', {
      cluster: 'eu',
    });

    const channel = pusher.subscribe('todolists');
    channel.bind('updated', function (data: any) {
      axios
        .get(`http://localhost:8080/api/todoitems/${data.itemId}`)
        .then((response) => {
          setTodos([...todos, response.data.item]);
          console.log(todos);
        });
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [todos]);

  return (
    <div className="todo-list-container">
      <h1>{listName}</h1>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button onClick={handleAddTodo}>Add todo</button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => {
          return <TodoItem todo={todo} />;
        })}
      </ul>
    </div>
  );
};

export default TodoList;
