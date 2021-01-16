import React from 'react';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div>
      <div className="home-container">
        <h1>Welcome to Task Avenue!</h1>
        <p>Your one-stop shop for making lists and sharing them</p>
      </div>
      <div className="home-btns-container">
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
