import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Button,
  makeStyles,
  createStyles,
  Theme,
} from '@material-ui/core';
import { Formik, Form, FormikProps } from 'formik';
import AuthService from '../../services/auth-service';
import * as Yup from 'yup';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: '450px',
      display: 'block',
      margin: '0 auto',
    },
    textField: {
      '& > *': {
        width: '100%',
        marginTop: '15px',
      },
    },
    submitButton: {
      marginTop: '24px',
    },
    title: { textAlign: 'center' },
    successMessage: { color: 'green' },
    errorMessage: { color: 'red' },
  })
);

interface ISignUpForm {
  username: string;
  password: string;
}

interface IFormStatus {
  message: string;
  type: string;
}

interface IFormStatusProps {
  [key: string]: IFormStatus;
}

const formStatusProps: IFormStatusProps = {
  success: {
    message: 'Signed up successfully! Please go to login page.',
    type: 'success',
  },
  duplicate: {
    message: 'username already exist. Please use different username.',
    type: 'error',
  },
  error: {
    message: 'Something went wrong. Please try again.',
    type: 'error',
  },
};

const Register: React.FunctionComponent = () => {
  const classes = useStyles();
  const [displayFormStatus, setDisplayFormStatus] = useState(false);
  const [formStatus, setFormStatus] = useState<IFormStatus>({
    message: '',
    type: '',
  });

  const registerNewUser = (data: ISignUpForm, resetForm: Function) => {
    AuthService.register(data.username, data.password)
      .then(() => {
        setFormStatus(formStatusProps.success);
        resetForm({});
      })
      .catch((error) => {
        const response = error.response;
        if (response.status === 400) {
          setFormStatus(formStatusProps.duplicate);
        } else {
          setFormStatus(formStatusProps.error);
        }
      })
      .finally(() => {
        setDisplayFormStatus(true);
      });
    resetForm({});
  };

  return (
    <div>
      <div className={classes.root}>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          onSubmit={(values: ISignUpForm, actions) => {
            registerNewUser(values, actions.resetForm);
            setTimeout(() => {
              actions.setSubmitting(false);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            username: Yup.string().required('Please enter username'),
            password: Yup.string()
              .matches(
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,20}\S$/
              )
              .required(
                'Please enter a valid password. One uppercase, one lowercase, one special character and no spaces'
              ),
          })}
        >
          {(props: FormikProps<ISignUpForm>) => {
            const {
              values,
              touched,
              errors,
              handleBlur,
              handleChange,
              isSubmitting,
            } = props;
            return (
              <Form>
                <h1 className={classes.title}>Sign up</h1>
                <Grid container justify="space-around" direction="row">
                  <Grid
                    item
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    className={classes.textField}
                  >
                    <TextField
                      inputProps={{ maxLength: 15 }}
                      id="username"
                      label="Username"
                      variant="outlined"
                      name="username"
                      value={values.username}
                      type="text"
                      error={errors.username && touched.username ? true : false}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid
                    item
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    className={classes.textField}
                  >
                    <TextField
                      inputProps={{ maxLength: 10 }}
                      name="password"
                      id="password"
                      label="Password"
                      variant="outlined"
                      value={values.password}
                      type="password"
                      error={errors.password && touched.password ? true : false}
                      helperText={
                        errors.password && touched.password
                          ? 'Please enter a valid password. One uppercase, one lowercase, one special character and no spaces'
                          : 'One uppercase, one lowercase, one special character and no spaces'
                      }
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Grid>
                  <Grid
                    item
                    lg={10}
                    md={10}
                    sm={10}
                    xs={10}
                    className={classes.submitButton}
                  >
                    <Button
                      type="submit"
                      style={{ backgroundColor: '#8a476f' }}
                      variant="contained"
                      color="secondary"
                      disabled={isSubmitting}
                    >
                      Submit
                    </Button>
                    {displayFormStatus && (
                      <div className="formStatus">
                        {formStatus.type === 'error' ? (
                          <p className={classes.errorMessage}>
                            {formStatus.message}
                          </p>
                        ) : formStatus.type === 'success' ? (
                          <p className={classes.successMessage}>
                            {formStatus.message}
                          </p>
                        ) : null}
                      </div>
                    )}
                  </Grid>
                </Grid>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default Register;
