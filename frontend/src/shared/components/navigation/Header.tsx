import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import green from '@material-ui/core/colors/green';
import { AuthContext } from '../../../shared/context/auth-context';

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  customColor: {
    // or hex code, this is normal CSS background-color
    backgroundColor: green[500],
  },
  customHeight: {
    minHeight: 200,
  },
  offset: theme.mixins.toolbar,
}));

export default function Header() {
  const auth = useContext(AuthContext);
  console.log('AUTH IS LOGGED IN?', auth.isLoggedIn);

  const classes = useStyles();
  const [example, setExample] = useState('primary');
  const isCustomColor = example === 'customColor';
  const isCustomHeight = example === 'customHeight';

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            TaskAvenue
          </Typography>

          {auth.isLoggedIn && (
            <>
              <IconButton color="inherit" onClick={() => setExample('default')}>
                <NavLink to="/login" exact>
                  Profile
                </NavLink>
              </IconButton>
              <IconButton
                color="inherit"
                onClick={() => {
                  auth.logout();
                  window.location.reload();
                }}
              >
                <NavLink to="/login" exact>
                  Logout
                </NavLink>
              </IconButton>
            </>
          )}
          {!auth.isLoggedIn && (
            <>
              <IconButton color="inherit" onClick={() => setExample('default')}>
                <NavLink to="/login" exact>
                  Login
                </NavLink>
              </IconButton>
              <IconButton color="inherit" onClick={() => setExample('primary')}>
                <NavLink to="/login" exact>
                  SignUp
                </NavLink>
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Toolbar />
    </React.Fragment>
  );
}

// import { AppBar, Toolbar, Typography, makeStyles } from '@material-ui/core';
// import React from 'react';

// const useStyles = makeStyles(() => ({
//   header: {
//     backgroundColor: '#6D214F',
//   },
//   logo: {
//     fontFamily: 'Bebas Neue',
//     fontWeight: 600,
//     color: '#FFFEFE',
//     textAlign: 'left',
//   },
// }));

// const Header: React.FC = () => {
//   const { header, logo } = useStyles();
//   const displayDesktop = () => {
//     return <Toolbar>{TaskAvenueLogo}</Toolbar>;
//   };

//   const TaskAvenueLogo = (
//     <Typography variant="h4" component="h1" className={logo}>
//       TaskAvenue
//     </Typography>
//   );

//   return (
//     <header>
//       <AppBar className={header}>{displayDesktop()}</AppBar>
//     </header>
//   );
// };

// export default Header;
