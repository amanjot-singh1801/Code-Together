import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { signUp } from '../Services/operations/authAPI';
const NewFile = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
  
    const [error, setError] = useState("");
  
    const navigate = useNavigate();
  
    const submitForm = (e) => {
      e.preventDefault();
      signUp(name,username,pwd,email,navigate);
    }
  
 
}

export default NewFile
