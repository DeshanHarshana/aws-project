import React, { useEffect, useState } from 'react';
import S3 from 'react-aws-s3';
import axios from 'axios';
import { useHistory, useLocation } from "react-router-dom";

import './paper.css';
const S3_BUCKET ='unipaperbucket';

const config = {
    bucketName: S3_BUCKET,
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_ACCESS_KEY,
}
const ReactS3Client = new S3(config);
const Paper = ({year, regNo, data, uri, email, filename, id}) => {
    const location = useLocation()
    const history = useHistory();
    const [cardState, setcardState] = useState("card1")

  
    
    const deletePaper = async() =>{
        setcardState("card1 card-background2")
        
        ReactS3Client.deleteFile(filename).then((res)=>{
            
            axios.delete("https://i6y4uitwnc.execute-api.us-east-1.amazonaws.com/final/items/"+id)
          .then((value)=>{console.log(value)})
          .catch((reason)=>{
              console.log(reason.response.data);
              setcardState("card1")
            })
          .finally(()=>{
            let List={
                year:data[0].year,
                department:data[0].department,
                subjectCode:data[0].subjectCode,
                exam:data[0].exam
            }
        console.log(List)
        setcardState("card1")
            history.push({
             pathname:"/dashboard/paperlist",
             state:{data:List}
            
         });
         
        })
        })
          
        
    }

    return (
     <div>
         
        <div className={cardState}>
            
            <h3>{year}</h3>
            <h6>Added by {regNo}</h6>
            <a href={uri} className="myButton" style={{ textDecoration: "none" }} target="_blank" ><i className="fas fa-eye"></i></a>
            {
            localStorage.getItem('email')===email  | localStorage.getItem('role')=="Lecture" && <button className="myButton" onClick={deletePaper} style={{  marginLeft:"5%" }}> <i className="fa fa-trash" aria-hidden="true"></i></button>
            
            }
         

      </div>

      </div>
    
    )
}

export default Paper
