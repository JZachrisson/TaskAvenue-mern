/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import AuthService from '../../services/auth-service';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

const newList = async (history: any, listName: string, user: string) => {
  const list = await axios.post('http://localhost:8080/api/todolists', {
    name: listName,
    listId: uuidv4(),
    creator: user,
  });

  history.push(`/list/${list.data.todoList.listId}`);
};

const Profile = () => {
  const [listName, setListName] = useState('');
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  const history = useHistory();

  return (
    <div>
      <div className="container">
        <div className="section">
          <form>
            <label htmlFor="description">List Name</label>
            <input
              value={listName}
              onChange={(e) => setListName(e.target.value)}
            />
          </form>
          <button
            onClick={() => {
              newList(history, listName, currentUser.username);
            }}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
