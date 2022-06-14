import React from 'react'
import { useHistory, useLocation } from "react-router-dom";
let data=require("./data.json") 
const ChooseExam = () => {
    const location = useLocation()
    const history = useHistory()
    return (


        <div>
            <div className="row">
                <div className="col d-flex justify-content-start">
                <button className="backButton" onClick={()=>{history.push({
                    pathname:"/dashboard/subjectlist",
                    state:{subjectName:location.state.data.department, Year:location.state.data.year}
                })}}><i className="fas fa-arrow-alt-circle-left"></i> Back</button>
               
                </div>
            </div>
        <div className="row">
        {data.map((value, index)=>{

       
            return (
                <div className="col-6" key={index}>
                    <div className="card" style={{ height:"50vh", width:"20vw" }} onClick={()=>{                               
                               let List={
                                   year:location.state.data.year,
                                   department:location.state.data.department,
                                   subjectCode:location.state.data.subjectCode,
                                   exam:value.name
                               }
                               console.log(List)
                               history.push({
                                pathname:"/dashboard/paperlist",
                                state:{data:List}
                            });

                    }}>
                        <div className="card_image"> <img src={value.image} alt="img"/> </div>
                        <div className="card_title title-white">
                            <p style={{ fontSize:"1.3rem", paddingTop:"2%", fontFamily:"Typo" }}>{value.name}</p>
                        </div>
                    </div>
                </div>)
         })}
    </div>
    </div>
    
    )
}

export default ChooseExam
