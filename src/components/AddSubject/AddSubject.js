import React, { useState } from 'react';
import { useHistory, useLocation } from "react-router-dom"
import './addsubject.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
const AddSubject = () => {
   const location = useLocation()
   const history=useHistory()
   var isDisable=false
    //fields
    const [subjectCode, setsubjectCode] = useState("");
    const [subjectName, setsubjectName] = useState("");

    const [description, setDescription] = useState("");
    
    const addSubject = (event) => {
        isDisable=true;
        toast.success("Adding");
        event.preventDefault()
        let data={
            id:uuidv4(),
            department:location.state.department,
            subject:subjectName,
            subjectCode:subjectCode,
            year:location.state.year,
            description:description,
            ownerEmail:localStorage.getItem('email')
        }
        axios.put("https://stbv0v7spb.execute-api.us-east-1.amazonaws.com/addSubject", data).then(res => {
										console.log(res.data);
										
										history.push({
                                            pathname:"/dashboard/subjectlist",
                                            state:{subjectName:location.state.department, Year:location.state.year}
                                        });
									}).catch(error => {
										console.log(error);
										toast.error("Something went wrong i can feel it");
									
									})
        console.log(data)
      }
    
    return (
        <div>
            <ToastContainer />
            <div className="row">
                <div className="col-12" style={{ marginBottom: "3%", marginTop: '3%' }}>
                    <h2>Add Subject</h2>
                </div>
            </div>
            <form onSubmit={addSubject}>
            <div className="row ">
               
                <div className="col-6 " >
                    <label className="d-flex justify-content-start">Subject Code</label>
                    <input className="form-control form-control-lg" type="text" id="subname" required  placeholder="Subject Code" onChange={(event)=>{
                        setsubjectCode(event.target.value)
                    }} />
                </div>
                <div className="col-6">
                    <label className="d-flex justify-content-start">Subject name</label>
                    <input className="form-control form-control-lg" type="text" placeholder="Subject Name" required onChange={(event)=>{
                        setsubjectName(event.target.value)
                    }} />
                </div>
                <div className="col-6" style={{ marginBottom: "3%", marginTop: '3%' }}>
                    <label className="d-flex justify-content-start">Year</label>
                    <input className="form-control form-control-lg" type="text" placeholder="Year" disabled={true} value={location.state.year} />
                </div>
                <div className="col-6" style={{ marginBottom: "3%", marginTop: '3%' }}>
                    <label className="d-flex justify-content-start">Department</label>
                    <input className="form-control form-control-lg" type="text" placeholder="Department" disabled={true} value={location.state.department} />
                </div>
                <div className="form-group">
                    <label className="d-flex justify-content-start" htmlFor="exampleFormControlTextarea1">Description</label>
                    <textarea className="form-control" required placeholder="Description..." id="exampleFormControlTextarea1" rows="4" onChange={(event)=>{
                        setDescription(event.target.value)
                    }}></textarea>
                </div>
                <div className="col-12 d-flex justify-content-end">
                <input type="submit" disabled={isDisable} className="myButton"  value="Add Subject" />
                </div>
               
                
               
            </div>
            </form>
        </div>
    )
}

export default AddSubject
