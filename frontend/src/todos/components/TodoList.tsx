/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import AuthService from '../../services/auth-service';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';
import axios from 'axios';

const TodoList = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  let { id } = useParams<{ id: string }>();
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = (e: any) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/todoitems', {
      name: input,
      description: 'A hardcoded description',
      creator: currentUser.username,
      listId: id,
    });

    setInput('');
  };

  useEffect(() => {
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
    <div className="App">
      <form>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={addTodo}>Add todo</button>
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li>
              {todo.name} created by: {todo.creator}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
