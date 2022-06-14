import React from 'react'
import { useHistory } from "react-router-dom";
import "./main.css";
const Main = (props) => {
    let data=props.data
    const history = useHistory();
    return (
        <div className="row ">
                      {data.map((value,index)=>{
                          return(
                        <div key={index} className="col-4">
                    <div className="card"  onClick={()=>{
                        history.push({
                            pathname:"/dashboard/year",
                            state:{name:value.name}
                        });
                    }}>
                        <div className="card_image"> <img src={value.imageUri} alt="img" /> </div>
                        <div className="card_title title-white">
                            <p style={{ fontSize:"1.3rem", paddingTop:"2%", fontFamily:"Typo" }}>{value.name}</p>
                        </div>
                    </div>
                        </div>)
                      })}
                </div> 
             
    )
}

export default Main
