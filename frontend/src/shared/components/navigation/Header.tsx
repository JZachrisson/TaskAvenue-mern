import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { AuthContext } from '../../../shared/context/auth-context';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#6D214F',
  },
  items: {
    color: 'white',
  },
  customFont: {
    fontFamily: 'Bebas Neue',
    fontSize: '40px',
  },
}));

export default function Header() {
  const auth = useContext(AuthContext);
  const history = useHistory();

  const classes = useStyles();

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar className={classes.navbar}>
          <Typography className={classes.customFont} variant="h1">
            TaskAvenue
          </Typography>

          {auth.isLoggedIn && (
            <div className={classes.items}>
              <IconButton color="inherit">
                <NavLink className={classes.items} to="/profile" exact>
                  Profile
                </NavLink>
              </IconButton>
              <IconButton
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
                <NavLink to="/login" exact>
                  Login
                </NavLink>
              </IconButton>
              <IconButton color="inherit">
                <NavLink to="/register" exact>
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
}
