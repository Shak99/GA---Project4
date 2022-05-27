import React, { useState } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";

import userService from "../../utils/userService";
import { useNavigate } from "react-router-dom";

export default function SignUpPage(props) {

  const navigate = useNavigate()

  const[error, setError] = useState('')
  const[state, setState] = useState({
    username:'',
    email:'',
    password:'',
    passwordConf:'',
  })

  async function handleSubmit(e){
    e.preventDefault()

    try{

      await userService.signup(state)
      props.handleSignUpOrLogin();
      navigate('/')

    } catch(err){
      console.log(err.message);
      setError(err.message)
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
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='red' textAlign='center'>
            Create your account
          </Header>
          <Form autoComplete='off' onSubmit={handleSubmit}>
            <Segment stacked>
              <Form.Input 
                name="username"
                placeholder="Username"
                value={state.username}
                onChange={handleChange}
                required
              />

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

              <Form.Input 
                type="password"
                name="passwordConf"
                placeholder="passwordConf"
                value={state.passwordConf}
                onChange={handleChange}
                required
              />

              <Button color='red' fluid size='large'>
                Sign Up!
              </Button>
          </Segment>
          {error ? <ErrorMessage error={error} /> : null}
        </Form>
        <Message>
          Already have an account? <a href='/login'>Sign In</a>
        </Message>
      </Grid.Column>
    </Grid>
    </>
  );
}
