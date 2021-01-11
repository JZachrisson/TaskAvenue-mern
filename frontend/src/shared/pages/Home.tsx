/* eslint-disable @typescript-eslint/no-unused-vars */
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import AuthService from '../../services/auth-service';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const newList = async (history: any, user: any) => {
  const list = await axios.post('http://localhost:8080/api/todolists', {
    name: 'The newest list',
    listId: uuidv4(),
    creator: user,
  });

  console.log('LIST', list);

  history.push(`/list/${list.data.todoList.listId}`);
};

const Home = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  const history = useHistory();

  return (
    <div className="container">
      <div className="section">
        <h1>Collaborative Task Lists</h1>
      </div>
      <div className="section">
        <button
          onClick={() => {
            newList(history, currentUser.username);
          }}
        >
          new task list
        </button>
      </div>
    </div>
  );
};

export default Home;
