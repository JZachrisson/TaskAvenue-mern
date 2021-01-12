/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react';
import { addTodo, deleteTodo } from '../../services/API';
import TodoItem from './TodoItem';
import AuthService from '../../services/auth-service';
import { useParams } from 'react-router-dom';
import Pusher from 'pusher-js';
import axios from 'axios';
import './TodoList.css';

const TodoList = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());
  const [listName, setListName] = useState('');
  const [todos, setTodos] = useState([]);
  const [formData, setFormData] = useState<ITodo | {}>();

  let { id } = useParams<{ id: string }>();

  const name = useRef<HTMLInputElement>(null);
  const description = useRef<HTMLInputElement>(null);

  const clearInput = () => {
    name.current.value = '';
    description.current.value = '';
  };

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    addTodo(formData, currentUser.username, id);
    setFormData({});
    clearInput();
  };

  const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
    e.preventDefault();
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
    });
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

    const listChannel = pusher.subscribe('todolists');
    listChannel.bind('updated', function (data: any) {
      axios
        .get(`http://localhost:8080/api/todoitems/${data.itemId}`)
        .then((response) => {
          setTodos([response.data.item, ...todos]);
          console.log(todos);
        });
    });

    const itemsChannel = pusher.subscribe('todoitems');
    itemsChannel.bind('deleted', function (data: any) {
      console.log('DELETED');

      axios
        .get(`http://localhost:8080/api/todoitems/list/${id}`)
        .then((response) => {
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
      <h1 className="listHeader">{listName}</h1>
      <form className="todo-form" onSubmit={handleAddTodo}>
        <div>
          <div>
            <label htmlFor="name">Name</label>
            <input ref={name} onChange={handleForm} type="text" id="name" />
          </div>
          <div>
            <label htmlFor="description">Description</label>
            <input
              ref={description}
              onChange={handleForm}
              type="text"
              id="description"
            />
          </div>
        </div>
        <button className="todo-btn" onClick={handleAddTodo}>
          Add Item
        </button>
      </form>
      <ul className="todo-list">
        {todos.map((todo) => {
          return <TodoItem todo={todo} deleteTodo={deleteTodo} />;
        })}
      </ul>
    </div>
  );
};

export default TodoList;
