import React from 'react'
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Books.css'

function Update() {

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
  const location =useLocation()

  const bookID=location.pathname.split("/")[2]

  const handleClick= async e =>{
    e.preventDefault()
    try{
      await axios.put("http://localhost:8800/books/"+bookID,books)
      navigate("/")
    }catch(err){
      console.log(err)
    }
  }

  console.log(books)
  return (
    <div className='form'>
       <h1>Update the book</h1>
       <input type="text" placeholder='title' onChange={handleChange} name='title' />
       <input type="text" placeholder='description' onChange={handleChange} name='description'/>
       <input type="number" placeholder='price'name='price'value={books.price}onChange={e => setBook(prev => ({ ...prev, price: Number(e.target.value) }))}/>
       <input type="text" placeholder='cover' onChange={handleChange} name='cover'/>

       <button className='formbutton' onClick={handleClick}>Update</button>
    </div>
  )
}

export default Update