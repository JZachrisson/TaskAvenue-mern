import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles(() => ({
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#6D214F',
  },
  items: {
    color: 'white',
    fontSize: '20px',
    paddingRight: 0,
    fontFamily: 'Bebas Neue',
  },
  customFont: {
    fontFamily: 'Bebas Neue',
    fontSize: '40px',
  },
}));

const Header: React.FC = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar className={classes.navbar}>
          <Typography className={classes.customFont} variant="h1">
            <NavLink
              className="link"
              style={{ color: 'white', textDecoration: 'none' }}
              to="/"
              exact
            >
              TaskAvenue
            </NavLink>
          </Typography>

          {auth.isLoggedIn && (
            <div className={classes.items}>
              <IconButton style={{ paddingRight: '2px' }} color="inherit">
                <NavLink
                  style={{ color: 'white', textDecoration: 'none' }}
                  className={`${classes.items} link`}
                  to="/profile"
                  exact
                >
                  {auth.username}
                </NavLink>
              </IconButton>
              <IconButton
                className={`${classes.items} link`}
                color="inherit"
                onClick={() => {
                  auth.logout();
                  history.push('/login');
                  window.location.reload();
                }}
              >
                Logout
              </IconButton>
            </div>
          )}
          {!auth.isLoggedIn && (
            <div className={classes.items}>
              <IconButton color="inherit">
                <NavLink
                  style={{ color: 'white', textDecoration: 'none' }}
                  className={`${classes.items} link`}
                  to="/login"
                  exact
                >
                  Login
                </NavLink>
              </IconButton>
              <IconButton color="inherit">
                <NavLink
                  style={{ color: 'white', textDecoration: 'none' }}
                  className={`${classes.items} link`}
                  to="/register"
                  exact
                >
                  SignUp
                </NavLink>
              </IconButton>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
};

export default Header;
