import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AuthService from './services/auth-service';

import Login from './auth/components/Login';
import Register from './auth/components/Register';
import Home from './shared/pages/Home';
import Profile from './user/pages/Profile';
import TodoList from './todos/components/TodoList';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
      <div className="container mt-3">
        <Router>
          <main>
            <nav className="navbar navbar-expand navbar-dark bg-dark">
              <Link to={'/'} className="navbar-brand">
                Collab Lists
              </Link>
              <div className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link to={'/home'} className="nav-link">
                    Home
                  </Link>
                </li>

                {currentUser && (
                  <li className="nav-item">
                    <Link to={'/user'} className="nav-link">
                      User
                    </Link>
                  </li>
                )}
              </div>

              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={'/profile'} className="nav-link">
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a
                      href="/login"
                      className="nav-link"
                      onClick={() => logOut()}
                    >
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={'/login'} className="nav-link">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={'/register'} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </nav>
            <Switch>
              <Route path="/" exact>
                <Home />
              </Route>
              <Route path="/list/:id" exact>
                <TodoList />
              </Route>
              <Route path="/profile" exact>
                <Profile />
              </Route>
              <Route path="/login" exact>
                <Login />
              </Route>
              <Route path="/register" exact>
                <Register />
              </Route>
            </Switch>
          </main>
        </Router>
      </div>
    </div>
  );
};

export default App;
