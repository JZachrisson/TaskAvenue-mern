/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AuthContext } from './shared/context/auth-context';

import AuthService from './services/auth-service';

import Login from './auth/components/Login';
import Header from './shared/components/navigation/Header';
import Register from './auth/components/Register';
import Home from './shared/pages/Home';
import Profile from './user/pages/Profile';
import TodoList from './todos/components/TodoList';

const App = () => {
  const [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  let routes;

  if (currentUser) {
    routes = (
      <Switch>
        <Route path="/profile" exact>
          <Profile />
        </Route>
        <Route path="/" exact>
          <Profile />
        </Route>
        <Route path="/list/:id" exact>
          <TodoList />
        </Route>
        <Redirect to="/profile" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
        <Route path="/register" exact>
          <Register />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!currentUser?.accessToken,
        token: currentUser?.accessToken,
        username: currentUser?.username,
        userId: currentUser?.id,
        login: AuthService.login,
        logout: AuthService.logout,
      }}
    >
      <Router>
        <div className="App">
          <Header />
          <main>{routes}</main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
