import React from 'react'
import { useHistory } from "react-router-dom";

import './index.css'
const Index = () => {
  const history = useHistory();

    return (

  
    <div className="container">
      <div className="box"  onClick={() =>{
      history.push("/sign-in/1")
    }}>
          <div className="text">
              <h1>Admin</h1>

          </div>
      </div>
     

      <div className="box three" onClick={() =>{
      history.push("/sign-in/2")
    }}>
          <div className="student">
              <h1 className="text">Student</h1>
              </div>
      </div>
    </div>


  


      
    )
}

export default Index
