import React, { useState, useEffect } from 'react';
import axios from 'axios'
import MainPages from './MainPages'
import LandingPage from './MainPages/LandingPage'
import OrderRequest from './MainPages/OrderRequest'

//This file contains all functions and global state for SPA. 
export default function MainPage(props) {

  const [mechanics, setMechanics]=useState([]);
  const [loading, setLoading]=useState(true);
  const [ratings, setRatings]=useState([]);
  const [users, setUsers]=useState([]);
  const [inspections, setInspections]=useState([]);

  useEffect(() => { 
    
      axios.get('http://localhost:3000/mechanics') // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        
        //console.log(typeof response.data) 
        // Just the message
        setMechanics(response.data);
      })    
},[]) 

return (
  <main>
    < LandingPage mechanics={mechanics} /> 
    {/* < OrderRequest /> */}
    {/* < MainPages /> */}
  </main>
)
}