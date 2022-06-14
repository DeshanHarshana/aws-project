import React, { useEffect, useState } from 'react'
import SubjectCard from './SubjectCard/SubjectCard'
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
const SubjectList = (props) => {
    const location = useLocation()
    const history = useHistory()
    const [loading, setLoading] = useState(true);
    const [subjectList, setsubjectList] = useState([]);
    useEffect(()=>{
        let data={
            department:location.state.subjectName,
            year:location.state.Year
        }
        console.log(data);
        axios.put("https://stbv0v7spb.execute-api.us-east-1.amazonaws.com/getSubjects", data).then((result)=>{
            console.log(result.data.Items);
            setsubjectList(result.data.Items);
            setLoading(false)
        })
        
    },[location])
    
    return (
        <div>
            {loading &&
            <div className="row d-flex justify-content-center">
                <div className="box2">

                </div>

        </div>
}
        
{!loading &&
            <div className="row">
                <div className="col d-flex justify-content-start">
                <button className="backButton" onClick={()=>{history.push({
                    pathname:"/dashboard/year",
                    state:{
                        name:location.state.subjectName
                    }
                })}}><i className="fas fa-arrow-alt-circle-left"></i> Back</button>
                
                </div>
            </div>
}
{!loading &&
            <div className="row">
            <div className="col-12 d-flex justify-content-end">
                <button className="myButton" onClick={()=>{
                        history.push({
                            pathname:"/dashboard/addsubject",
                            state:{year:location.state.Year, department:location.state.subjectName}
                        });
                }}>Add Subject</button>
                </div>
             {subjectList.map((value, index)=>{
                 return(
                    <div className="col-4" key={index}>            
                    <SubjectCard data={value} year={location.state.Year} department={location.state.subjectName} ></SubjectCard>               
            </div>
                 )
           
            })}
        </div>
}
        </div>
      
    )
}

export default SubjectList
