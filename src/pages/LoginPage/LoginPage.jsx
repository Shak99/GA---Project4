import React, { useState } from "react";
import "./LoginPage.css";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useNavigate, Link } from "react-router-dom";
//import Navigation from '../../components/Navigation/Navigation'
//import PageHeader from '../..components/Header/Header'

export default function LoginPage(props) {
  const [error, setError] = useState('')
  const [state, setState] = useState({
    email:'',
    password:'',
  })

  const navigate = useNavigate();

  async function handleSubmit(e){
    e.preventDefault();

    try {

      await userService.login(state);
      props.handleSignUpOrLogin();
      navigate("/home");
      
    } catch (err) {
      // Invalid user data (probably duplicate email)
      setError(err.message);
    }
  }

  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value    
    })
  }

  return (
    <>
    <div>
      
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='red' textAlign='center'>
            Sign into your account
          </Header>
          <Form autoComplete='off' onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input 
                name="email"
                placeholder="Email"
                value={state.email}
                onChange={handleChange}
                required
              />

              <Form.Input 
                type="password"
                name="password"
                placeholder="password"
                value={state.pasasword}
                onChange={handleChange}
                required
              />

              <Button type='submit' color='red' fluid size='large'>
                Log In
              </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
        <Message>
          Don't have an account? <a href='/signup'>Sign up</a>
        </Message>
      </Grid.Column>
    </Grid>
    </div>
    </>
  );
}
