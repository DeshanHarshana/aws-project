import React, {useState} from 'react'
import { useHistory, useLocation } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


import "./subjectclass.css";
import axios from 'axios';
const SubjectCard = (props) => {
   const history=useHistory()
   const [cardState, setcardState] = useState("card1")
    let Data={
        year:props.year,
        department:props.department,
        subjectCode:props.data.subjectCode
    }

    return (
        <div className={cardState}>
            <h3>{props.data.subjectCode}</h3>
            <p className="small">{props.data.subject}</p>
            <div className="go-corner">
                <div className="go-arrow"  onClick={()=>{
            console.log(Data)
            history.push({
                pathname:"/dashboard/exams",
                state:{data:Data}
            });
        }}>
                  <i className="fas fa-eye"></i>
                </div>
                
            </div>
            {
                (localStorage.getItem('role')==="Lecture" || (props.data.ownerEmail == localStorage.getItem('email'))) && 
                    <div className="d-flex justify-content-center d-flex align-items-end" onClick={()=>{
                        confirmAlert({
                            title: 'Confirm to delete!',
                            message: `You are going to delete ${props.data.subject}. Are you sure? After you delete this every paper under this course can not be accessible`,
                            buttons: [
                              {
                                label: 'Yes',
                                onClick: () => {
                                    setcardState("card1 card-background2")
                                    axios.delete("https://i6y4uitwnc.execute-api.us-east-1.amazonaws.com/final/remove/"+props.data.id).then((res)=>{
                                        console.log("Deleted");
                                        history.push({
                                            pathname:"/dashboard/subjectlist",
                                            state:{
                                                subjectName:props.data.department, Year:props.data.year
                                            }
                                        })
                                    }).then(()=>{
                                        setcardState("card1")
                                    }).catch((reason)=>{
                                        console.log(reason);
                                       
                                    })
                                }
                              },
                              
                            ]
                          });
                          
                    }}>
                    <div className="go-recycle">
                    <i className="fa fa-trash" aria-hidden="true"></i>
                        </div>
                        </div>
                
            }
           
        </div>
    )
}

export default SubjectCard
