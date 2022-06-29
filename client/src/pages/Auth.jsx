import React from 'react';
import { useState } from 'react';
import { Container, Form, Button, Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { login } from '../actions/user';

const Auth = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ height: '100vh' }}
    >
      <Card className="p-4" style={{ width: 600 }}>
        <h1 className="text-center mb-4">Log In</h1>
        <Form className="d-flex flex-column">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Form.Text className="text-muted"></Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            className="align-self-end"
            onClick={() => dispatch(login(email, password))}
          >
            Log In
          </Button>
        </Form>
      </Card>
    </Container>
  );
};

export default Auth;
