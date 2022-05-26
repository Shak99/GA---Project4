import React, { useState } from "react";
import "./LoginPage.css";
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import userService from "../../utils/userService";
import { useNavigate, Link } from "react-router-dom";
import Navigation from '../../components/Navigation/Navigation'

BASE_URL='https://superheroapi.com/api/'
KEY = '1138360860067441'


export default function HomePage(){

    const[state, setState] = useState('')

    state ={
        characters:[]
    }

    componentDidMount(){
        fetch(`${BASE_URL}/${KEY}`)
    }

    render(){
        return
    }
}

