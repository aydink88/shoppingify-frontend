import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import * as yup from 'yup';

import useActiveShoppingListState from 'src/hooks/useActiveShoppingList';
import useAuth from 'src/hooks/useAuth';
import useNotification from 'src/hooks/useNotification';
import { useShoppingLists } from 'src/hooks/useShoppingLists';
import { loginOrRegister } from 'src/services/auth';
import { fetchShoppingList } from 'src/services/shoppingLists';
import { groupItemsOfShoppingList, prepareActiveShoppingList } from 'src/utils/shoppingList';

type TAuthenticateFields = {
  email: string;
  password: string;
  passwordConfirm?: string;
};

const validationSchemaBase = {
  email: yup.string().required('required').email('invalid email'),
  password: yup.string().required('required').min(6),
};

const loginSchema = yup.object().shape(validationSchemaBase);
const registerSchema = yup.object().shape({
  ...validationSchemaBase,
  passwordConfirm: yup
    .string()
    .required()
    .test(
      'password-confirm',
      'password confirm failed',
      (value, ctx) => value === ctx.parent.password
    ),
});

export default function Authenticate() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { setAuth } = useAuth();
  const { setShoppingLists } = useShoppingLists();
  const { setActiveShoppingList } = useActiveShoppingListState();

  //initially active mode is "login"
  const [registerMode, setRegisterMode] = useState(false);
  const { setNotification } = useNotification();

  useEffect(() => {
    setRegisterMode(pathname.startsWith('/register'));
  }, [pathname]);

  // (values, formikhelpers) => void | Promise<void>
  const submitForm = async (
    { email, password }: TAuthenticateFields,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    let todo: 'register' | 'login' = 'login';
    if (registerMode) {
      todo = 'register';
    }

    try {
      const userData = await loginOrRegister(email, password, todo);
      setAuth({ id: userData._id, email: userData.email });
      setShoppingLists(userData.shopping_lists);
      let activeList = prepareActiveShoppingList(userData.shopping_lists);
      if (activeList._id) {
        const activeListData = await fetchShoppingList(activeList._id);
        if (activeListData) {
          activeList = groupItemsOfShoppingList(activeListData);
        }
      }
      setActiveShoppingList(activeList);
      navigate('/items', { replace: true });
    } catch (e: any) {
      setSubmitting(false);
      setNotification({ message: e.message, variant: 'Danger' });
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <Formik
        initialValues={{ email: '', password: '', passwordConfirm: '' }}
        validationSchema={registerMode ? registerSchema : loginSchema}
        onSubmit={submitForm}
      >
        {({ errors, touched, handleSubmit, isSubmitting, getFieldProps }) => (
          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                {...getFieldProps('email')}
                isInvalid={touched.email && !!errors.email}
                isValid={touched.email && !errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                {...getFieldProps('password')}
                isInvalid={touched.password && !!errors.password}
                isValid={touched.password && !errors.password}
              />
              <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
            </Form.Group>
            {registerMode && (
              <Form.Group className="mb-3" controlId="formBasicPasswordConfirm">
                <Form.Label>Password Confirm</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password Confirm"
                  {...getFieldProps('passwordConfirm')}
                  isInvalid={touched.passwordConfirm && !!errors.passwordConfirm}
                  isValid={touched.passwordConfirm && !errors.passwordConfirm}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.passwordConfirm}
                </Form.Control.Feedback>
              </Form.Group>
            )}
            <Button variant="primary" type="submit" disabled={isSubmitting}>
              Submit
            </Button>
            {registerMode ? (
              <p>
                Already registered? <Link to="/login">Login</Link>
              </p>
            ) : (
              <p>
                Not registered? <Link to="/register">Register</Link>
              </p>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
