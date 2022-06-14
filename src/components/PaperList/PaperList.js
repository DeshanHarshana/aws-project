import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from "react-router-dom";
import axios from 'axios';
import Paper from './Paper/Paper';
const PaperList = () => {
    const [papers, setPapers] = useState([])
    const [loading, setLoading] = useState(true);
    const location = useLocation()
    const history = useHistory();
    let Data={
        year:location.state.data.year,
        department:location.state.data.department,
        subjectCode:location.state.data.subjectCode
    }

    console.log(location.state.data)

    useEffect(()=>{
        axios.put("https://mwhnp1hb4f.execute-api.us-east-1.amazonaws.com/getPapers", location.state.data).then((result)=>{
            
            setPapers(result.data.Items);
            setLoading(false)
        })
    },[location])
    
    return (
        
        <div>
            { loading &&
            <div className="row d-flex justify-content-center">
            <div className="box2">

            </div>

    </div>
        }
        { !loading &&
        <div className="row">
       
                <div className="col-6 d-flex justify-content-start">
                <button className="backButton" onClick={()=>{history.push({
                    pathname:"/dashboard/exams",
                    state:{data:Data}
                })}}><i className="fas fa-arrow-alt-circle-left"></i> Back</button>
               
                </div>
            
            <div className="col-6 d-flex justify-content-end">
            <button className="myButton" onClick={()=>{
                history.push({
                    pathname:"/dashboard/addpaper",
                    state:{data:location.state.data}
                });
            }}>Add Paper</button>
            </div>
        </div>
}
{!loading &&
        <div className="row">
            
      
            {papers.map((value, index)=>{
              return (    <div className="col-4"  key={index}>
                <Paper year={value.paperYear} data={[location.state.data]} id={value.id} filename={value.filename} regNo={value.regNo} uri={value.fileUrl} email={value.ownerEmail} ></Paper>
                </div>
                )
            })}
        
        
    </div>
}
    </div>
    )
}

export default PaperList
