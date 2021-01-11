/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AuthService from '../../../services/auth-service';

import './NavLinks.css';

const NavLinks = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <ul className="nav-links">
      {currentUser && (
        <>
          <li>
            <NavLink to={'/profile'} className="nav-link">
              {currentUser.username}
            </NavLink>
          </li>
          <li>
            <a href="/login" className="nav-link" onClick={() => logOut()}>
              LogOut
            </a>
          </li>
        </>
      )}
      {!currentUser && (
        <>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/register">Sign Up</NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
