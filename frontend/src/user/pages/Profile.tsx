/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import AuthService from '../../services/auth-service';

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div>
      <header>
        <h3>
          <strong>{currentUser.username}</strong>
        </h3>
      </header>
      <p>
        <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{' '}
        {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
      </p>
      <p>
        <strong>Id:</strong> {currentUser.id}
      </p>
    </div>
  );
};

export default Profile;
