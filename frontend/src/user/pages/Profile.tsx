/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext } from 'react';
import { AuthContext } from '../../shared/context/auth-context';
import { TextField, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

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

const Profile = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();

  return (
    <div>
      <Formik
        initialValues={{ title: '' }}
        onSubmit={(values, { resetForm }) => {
          newList(history, values, auth.username);
          resetForm();
        }}
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <div>
              <TextField
                placeholder="Title"
                name="title"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>
            <Button variant="contained" color="primary" type="submit">
              Create New List
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Profile;
