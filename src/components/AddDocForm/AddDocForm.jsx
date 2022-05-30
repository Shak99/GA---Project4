import React, { useState } from 'react';

import { Button, Form, Grid, Segment } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom'
import * as docAPI from "../../utils/docApi";

export default function AddDocForm(props){

    console.log(props, '<- addDocForm props')

  const [selectedFile, setSelectedFile] = useState('')
  const [state, setState] = useState({
    title: '',
    descrption: ''
  })
  const navigate = useNavigate()

  function handleFileInput(e){
    setSelectedFile(e.target.files[0])
  }


  function handleChange(e){
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e){
      console.log(e, '--This is e')
    e.preventDefault()
             
    const formData = new FormData()
    console.log(state)
    
    formData.append('title', state.title)
    formData.append('document', selectedFile)
    formData.append('description', state.description)
    props.handleAddDoc(formData); 
    console.log(formData, '----this is FormData')
    navigate('/');
    
    // Have to submit the form now! We need a function!
  }


  return (
    
    <Grid textAlign='center' style={{ height: '25vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Segment>
        
            <Form  autoComplete="off" onSubmit={handleSubmit}>
            
              <Form.Input
                  className="form-control"
                  name="title"
                  value={state.title}
                  placeholder="Title of Document"
                  onChange={handleChange}
                  type="text"
                  required
              />   
              <Form.Input
                className="form-control"
                type="file"
                name="document"
                placeholder="upload image"
                onChange={handleFileInput}
              />
              <Form.Input
                  className="form-control"
                  name="description"
                  value={state.description}
                  placeholder="Description. What is this?"
                  onChange={handleChange}
                  type="text"
                  required
              />  
              <Button
                type="submit"
                className="btn"
                //onclick={handleAddDoc}
              >
                Add Document
              </Button>
            </Form>
          </Segment>
      </Grid.Column>
    </Grid>
   
  ); 
}