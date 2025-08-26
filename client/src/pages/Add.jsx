import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Books.css'

function Add() {

  const [books,setBook]= useState({
    title:"",
    description:"",
    price:"",
    cover:""
  });

  const handleChange= async e=>{
    setBook(prev=>({...prev,[e.target.name]:e.target.value}))
  }
  const navigate =useNavigate()

  const handleClick= async e =>{
    e.preventDefault()
    try{
      await axios.post("http://localhost:8800/books",books)
      navigate("/")
    }catch(err){

    }
  }

  console.log(books)
  return (
    <div className='form'>
       <h1>Add new book</h1>
       <input type="text" placeholder='title' onChange={handleChange} name='title' />
       <input type="text" placeholder='description'onChange={handleChange}  name='description'/>
       <input type="text" placeholder='price'onChange={handleChange}  name='price'/>
       <input type="text" placeholder='cover' onChange={handleChange}  name='cover'/>

    <button className='formbutton' onClick={handleClick}> Add </button>
    </div>
  )
}


export default Add