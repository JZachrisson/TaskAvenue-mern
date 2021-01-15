/* eslint-disable @typescript-eslint/no-unused-vars */

import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <div className="container">
      <div className="section">
        <h1>Welcome to Task Avenue!</h1>
        <p>Your one-stop shop for making lists and sharing them</p>
      </div>
      <div>
        <Button
          style={{
            backgroundColor: '#792959',
            marginRight: '10px',
          }}
          variant="contained"
        >
          <Link style={{ color: 'white', textDecoration: 'none' }} to="/login">
            LOGIN
          </Link>
        </Button>
        <Button
          style={{
            backgroundColor: '#792959',
          }}
          variant="contained"
        >
          <Link
            style={{ color: 'white', textDecoration: 'none' }}
            to="/register"
          >
            SIGNUP
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Home;
