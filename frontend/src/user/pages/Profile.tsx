/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { TextField, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useHistory, Link } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import './Profile.css';
interface Values {
  title: string;
}

const newList = async (history: any, values: Values, user: string) => {
  const list = await axios.post('http://localhost:8080/api/todolists', {
    name: values.title,
    listId: uuidv4(),
    creator: user,
  });

  history.push(`/list/${list.data.todoList.listId}`);
};

const Profile: React.FC = () => {
  const auth = useContext(AuthContext);
  const [lists, setLists] = useState([]);
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/todolists/user/${auth.username}`)
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
                placeholder="Title"
                required
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <Button
              style={{ marginTop: '15px' }}
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
        <ul>
          {lists.map((list) => {
            return (
              <li key={list.listId}>
                <Link to={`/list/${list.listId}`}>{list.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
