/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { TextField, Button } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './Profile.css';

//const baseUrl: string = 'https://taskavenue-backend.herokuapp.com/api/';

//const baseUrl: string = 'http://localhost:8080/api/';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: theme.palette.background.paper,
    },
  })
);

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}
interface Values {
  title: string;
}

const newList = async (history: any, values: Values, user: string) => {
  const list = await axios.post(
    'https://taskavenue-backend.herokuapp.com/api/todolists',
    {
      name: values.title,
      listId: uuidv4(),
      creator: user,
    }
  );

  history.push(`/list/${list.data.todoList.listId}`);
};

const Profile: React.FC = () => {
  const classes = useStyles();
  const auth = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(
        `https://taskavenue-backend.herokuapp.com/api/todolists/user/${auth.username}`
      )
      .then((response) => {
        setLists(response.data.lists);
      });
  }, []);

  return (
    <div>
      <Formik
        initialValues={{ title: '' }}
        onSubmit={(values, { resetForm }) => {
          newList(history, values, auth.username);
          resetForm();
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required('Please enter a title'),
        })}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div>
              <TextField
                inputProps={{ maxLength: 15 }}
                placeholder="Title"
                required
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <Button
              style={{ marginTop: '15px', backgroundColor: '#792959' }}
              variant="contained"
              color="primary"
              type="submit"
            >
              Create New List
            </Button>
          </Form>
        )}
      </Formik>
      <div className="profile-list-container">
        <h1>My lists</h1>
        <List>
          {lists.map((list) => {
            return (
              <div className={classes.root}>
                <ListItemLink href={`/list/${list.listId}`} key={list.listId}>
                  <ListItemText primary={list.name} />
                </ListItemLink>
                <Divider />
              </div>
            );
          })}
        </List>
      </div>
    </div>
  );
};

export default Profile;
